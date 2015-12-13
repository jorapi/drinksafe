angular.module('RDash')
  .controller('drinkDisplayController', function($scope, $http, $location) {

    init();

    $scope.$watch(function() {
      return $location.search();
    }, function(value) {
      $scope.urlData = value;
      init();
    });

    function init() {
      $scope.urlData = $location.search();
      $scope.topDisplay = true;
      $scope.favorited = false;
      $scope.hideHeart = true;
      $scope.rate = 0;
      $scope.myRate = 0;
      $scope.userRate = 0;
      $scope.pastRate = 0;
      $scope.enter = false;
      $scope.haveAllIng = false; //Logic for showing the Drinkitbutton
      $http.get("/auth/user")
        .success(function(response) {
          $scope.currentUser = response;
          if (response.profiles != null && response.profiles.length > 0) {
            $scope.hideHeart = false;
            if ($scope.currentUser.favoriteDrinks != null &&
              //$scope.currentUser.id != $scope.urlData.drinkId && //hide if we created the drink
              $scope.currentUser.favoriteDrinks.indexOf($scope.urlData.drinkId) > -1)
              $scope.favorited = true;
          }
        });
      $http.get("/api/drinks/" + $scope.urlData.drinkId)
        .success(function(response) {
          $scope.dataDrink = response;
          $scope.dataAmount = $scope.dataDrink._amounts;
          $scope.rate = 0;
          $scope.userRate = 0;
          if (response.commented) {
            if ($scope.currentUser) {
              $scope.hasRated = (!((response.commented.indexOf($scope.currentUser.id + "")) === -1));
            } else {
              $scope.hasRated = true;
            }
            $scope.rate = response.rating / response.commented.length;
            $scope.userRate = $scope.rate;
          } else {
            $scope.hasRated = false;
          }

        }).then(getIngredients());
    };


    function getIngredients() {
      $http.get("/api/drinks/" + $scope.urlData.drinkId + "/ingredients")
        .success(function(response) {
          $scope.dataIngredient = response;
          var repeat = true;
          for (i = 0; i < $scope.dataIngredient.length; ++i) {
            repeat = true;
            for (j = 0; i < $scope.dataAmount.length && repeat; ++j) {
              if ($scope.dataIngredient[i].id === $scope.dataAmount[j].ingredientID) {
                $scope.dataIngredient[i].amount = $scope.dataAmount[j];
                repeat = false;
              }
            }
          }
          //Adding the ammounts the users has to the ingredentslist

          if ($scope.currentUser) {
            $scope.haveAllIng = true;
            angular.forEach($scope.dataIngredient, function(ingInDrink) {
              var removed = false;
              angular.forEach($scope.currentUser._amounts, function(userAmount) {
                if (ingInDrink.id === userAmount.ingredientID) {
                  ingInDrink.amount.amountUserHas = userAmount.amount;
                  removed = true;
                  if (ingInDrink.amount.amountUserHas < ingInDrink.amount.amount) {
                    $scope.haveAllIng = false
                  }
                }
              });
              if (!removed) {
                ingInDrink.amount.amountUserHas = "--";
                $scope.haveAllIng = false;
              }
            });
          }
        });

    };
    $scope.favorite = function() {
      if (!$scope.favorited) {
        if ($scope.currentUser.favoriteDrinks == null)
          $scope.currentUser.favoriteDrinks = [];
        $scope.currentUser.favoriteDrinks.push($scope.urlData.drinkId);
      } else {
        var i = $scope.currentUser.favoriteDrinks.indexOf($scope.urlData.drinkId);
        $scope.currentUser.favoriteDrinks.splice(i, 1);
      }
      $http.put("/api/users/me", $scope.currentUser);
      $scope.favorited = !$scope.favorited;
    };

    $scope.rated = function(val) {
      if (!$scope.hasRated && $scope.currentUser && $scope.currentUser.id) {
        $scope.dataDrink.rating += val - $scope.pastRate;
        if (!$scope.dataDrink.commented) {
          $scope.dataDrink.commented = [];
        }
        if ($scope.pastRate === 0) {
          $scope.dataDrink.commented.push($scope.currentUser.id);
        }
        $scope.pastRate = val;
        $http.put("/api/drinks/" + $scope.urlData.drinkId, $scope.dataDrink)
      }
    };

    $scope.mouse = function(val) {
      if (!$scope.hasRated && $scope.currentUser && $scope.currentUser.id) {
        $scope.rate = val;
      }
    };

    $scope.rateClick = function(val) {
      if (!$scope.hasRated && $scope.currentUser && $scope.currentUser.id) {
        $scope.myRate = val;
        $scope.userRate = val;
        $scope.rated(val);
        $scope.permColor = true;
      }
    };
    $scope.divEnter = function() {
      if (!$scope.hasRated && $scope.currentUser && $scope.currentUser.id) {
        $scope.rate = $scope.myRate;
      }
    };
    $scope.divLeave = function() {
      if (!$scope.hasRated && $scope.currentUser && $scope.currentUser.id) {
        $scope.rate = $scope.userRate;
      }
    };
    $scope.drinkIt = function() {
      if (!$scope.currentUser) {
        $scope.status = "You must be logged in to drink something";
        return;
      }
      angular.forEach($scope.dataIngredient, function(ing) {
        var removed = false;
        $scope.removedAll = true;

        angular.forEach($scope.currentUser._amounts, function(amountYouHave) {
          if (ing.id == amountYouHave.ingredientID) { //if same ingredient
            if (ing.amount.amount <= amountYouHave.amount) { // if user has enough
              amountYouHave.amount -= ing.amount.amount; //remove amount from user.amounts
              amountYouHave.amount = amountYouHave.amount.toFixed(2);
              ing.amount.amountUserHas = amountYouHave.amount;
              removed = true;
            } else {
              $scope.status = "You dont have enough ingredients " + amount.ingredientID;
              $scope.removedAll = false;
            }
          }
        });
        if (!removed) {
          $scope.status = "you have no ingredient " + amount.ingredientID;
          $scope.removedAll = false;
        }
      });
      if ($scope.removedAll) {
        $scope.status = "Ingredients removed.";
        $http.put("/api/users/me", $scope.currentUser);
        console.log($scope.currentUser);
        console.log($scope.dataIngredients);
      }
    };

  });
