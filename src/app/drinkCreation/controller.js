angular.module('RDash')
  .controller('drinkCreationController', function($scope, $http) {
    //check if user is logged in
    $scope.hideUserMenu = false;
    $http.get("/auth/user")
     .success(function(response){
       $scope.userJSON = response;
        if (response.profiles != null && response.profiles.length > 0){
          $scope.hideUserMenu = false;
        }
      });

    $scope.currentImage = "img/red-solo-cup.jpg";
    $scope.drink = {
      "name": "",
      "rating": 0,
      "instructions": "",
      "description": "",
      "userId": 0,
      "color": "",
      "_amounts": []
    };
    $scope.recipe = {
      "name": "",
      "rating": 0,
      "instructions": "",
      "description": "",
      "userId": 0,
      "color": ""
    };
    $scope.image = {
      "file": "",
      "id": ""
    }
    $scope.directionStep;
    $scope.directions = [];
    $scope.ingredients = [];
    $scope.drikPost = false;
    $http.get("/api/ingredients")
      .success(function(response) {
        $scope.dataIngredients = response;
      });


    $scope.submit = function() {
      var holdDirections = [];
      for (i = 0; i < $scope.directions.length; ++i) {
        holdDirections.push($scope.directions[i].text);
      }
      angular.forEach($scope.ingredients, function(ing, i){
        $scope.drink._amounts.push({
          "ingredientID": ing.id,
          "amount": ing.amount,
          "unit": "oz",
          "id": i
        });
      });

      $scope.drink.photo=$scope.currentImage;
      $scope.drink.instructions = holdDirections;
      console.log($scope.drink);
      $http.put("/api/drinks", $scope.drink)
        .success(function(response) {
          for (i = 0; i < $scope.ingredients.length; ++i) {
            $http.put("/api/drinks/" + response.id + "/ingredients/rel/" + $scope.ingredients[i].id);
          }
          $scope.drinkPost = true;
        });
    };

    $scope.remove = function(item) {
      var index = $scope.ingredients.indexOf(item);
      $scope.dataIngredients.push($scope.ingredients[index]);
      $scope.ingredients.splice(index, 1);
    };

    $scope.addIng = function(item) {
      var index = $scope.dataIngredients.indexOf(item);
      var ing = $scope.dataIngredients[index];
      ing.amount = 0;
      $scope.ingredients.push(ing);
      $scope.dataIngredients.splice(index, 1);
    };

    $scope.addStep = function() {
      if ($scope.directionStep && $scope.directionStep.length > 2 && $scope.directions.length < 10) {
        var hold = {
          "step": $scope.directions.length + 1,
          "text": $scope.directionStep
        };
        $scope.directions.push(hold);
        $scope.directionStep = "";
      }
    };

    $scope.removeStep = function(item) {
      var index = $scope.directions.indexOf(item);
      $scope.directions.splice(index, 1);
      for (i = index; i < $scope.directions.length; ++i) {
        $scope.directions[i].step--;
      }
    };

    $scope.onSuccess = function(response) {
      $scope.currentImage = response.data.result.url;
    };
  });
