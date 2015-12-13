angular.module('RDash')
  .controller('drinkSearchController', function($scope, $http, $anchorScroll, $location, $routeParams, $stateParams, $window) {

    $http.get("api/drinks")
      .success(function(data) {
        $scope.drinks = data;
      });

    $scope.filter = "name";
    $scope.btnValue = "OFF";
    $scope.myBtn = "btn-danger";
    $scope.limit = 10;
    $scope.search = "";
    $scope.mySearch = false;
    $scope.ingredients = [];
    $scope.loggedIn = false;

    $http.get("/auth/user")
      .success(function(response) {
        $scope.currentUser = response;
        $scope.userIngredientsId = [];
        if (response.profiles != null && response.profiles.length > 0) {
          $scope.loggedIn = true;
          for (var i = 0; i < $scope.currentUser._amounts.length; ++i) {
            $scope.userIngredientsId.push($scope.currentUser._amounts[i].ingredientID);
          }
        }
      });

    $http.get("/api/ingredients")
      .success(function(response) {
        $scope.dataIngredients = response;
      });
      $scope.isTouch = is_touch_device();
    if ($location.search().search != null) {
      $scope.search = $location.search().search;
    }
    if($window.innerWidth <= 670){
      $scope.isMobile=true;
    }

    $scope.$watch(function(){
     return $window.innerWidth;
  }, function(value) {
    if(value <= 670){
      $scope.isMobile=true;
    }else{
      $scope.isMobile=false;
    }
 });

    function is_touch_device() {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    };

    $scope.drinkClick = function(drink){
      if($scope.isTouch){
        $scope.redirect(drink.id);
      }else{
        $scope.unexpand();
        drink.expand=!drink.expand;
      }
    };

    $scope.buttonPress = function() {
      $scope.mySearch = !$scope.mySearch;
      $scope.customSearch();
      if ($scope.mySearch) {
        $scope.btnValue = "ON";
        $scope.myBtn = "btn-info";
      } else {
        $scope.btnValue = "OFF";
        $scope.myBtn = "btn-danger";
      }
    };

    $scope.customSearch = function() {
      if ($scope.mySearch && $scope.loggedIn) {
        for (var i = 0; i < $scope.ingredients.length; ++i) {
          $scope.dataIngredients.push($scope.ingredients[i]);
        }
        $scope.ingredients = [];
        $scope.holdDrink = $scope.drinks;
        $scope.holdIngredients = $scope.dataIngredients;
        $scope.drinks = [];
        $scope.dataIngredients = [];
        for (var i = 0; i < $scope.holdDrink.length; ++i) {
          if (canMake($scope.holdDrink[i])) {
            $scope.drinks.push($scope.holdDrink[i]);
          }
        }
        for (var i = 0; i < $scope.holdIngredients.length; ++i) {
          if (!($scope.userIngredientsId.indexOf($scope.holdIngredients[i].id) === -1)) {
            $scope.dataIngredients.push($scope.holdIngredients[i]);
          }
        }
      } else {
        if ($scope.holdDrink) {
          $scope.drinks = $scope.holdDrink;
        }
        if ($scope.holdIngredients) {
          $scope.dataIngredients = $scope.holdIngredients;
          $scope.ingredients = [];
        }
      }
    };

    function canMake(drink) {
      for (var i = 0; i < drink._amounts.length; ++i) {
        if ($scope.userIngredientsId.indexOf(drink._amounts[i].ingredientID) === -1) {
          return false;
        }
      }
      return true;
    };

    $scope.redirect = function(id) {
      $location.path("/drinkView").search({
        drinkId: id
      });
    };

    $scope.filterFunction = function(element) {
      if ($scope.ingredients.length > 0) {
        if (!filterByIngredient(element)) {
          return false;
        }
      }
      if ($scope.search.length <= 0) {
        return true;
      }
      if (element.name.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 || element.description.toLowerCase().indexOf($scope.search.toLowerCase()) > -1) {
        return true;
      } else {
        return false;
      }
    };

    function filterByIngredient(element) {
      var hold = [];
      for (var i = 0; i < element._amounts.length; ++i) {
        hold.push(element._amounts[i].ingredientID);
      }
      for (var i = 0; i < $scope.ingredients.length; ++i) {
        if (hold.indexOf($scope.ingredients[i].id) === -1) {
          return false;
        }
      }
      return true;
    };

    $scope.addIng = function(item) {
      var index = $scope.dataIngredients.indexOf(item);
      var ing = $scope.dataIngredients[index];
      $scope.ingredients.push(ing);
      $scope.dataIngredients.splice(index, 1);
    };

    $scope.removeIng = function(item) {
      var index = $scope.ingredients.indexOf(item);
      var ing = $scope.ingredients[index];
      $scope.dataIngredients.push(ing);
      $scope.ingredients.splice(index, 1);
    };

    $scope.unexpand = function() {
      angular.forEach($scope.drinks, function(drink, index) {
        drink.expand = false;
      });
    };
  });
