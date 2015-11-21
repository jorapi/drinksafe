angular.module('RDash')
  .controller('userCabinetController', function($scope, $http) {
    //check if user is logged in
    $scope.hideUserMenu = true;
    $http.get("/auth/user")
     .success(function(response){
       $scope.userJSON = response;
        if (response.profiles != null && response.profiles.length > 0){
          $scope.hideUserMenu = false;
        }
      });

      $scope.ingredients = [];

      $http.get("/api/ingredients")
        .success(function(response) {
          $scope.dataIngredients = response;
        });

      $scope.currIng = {};

      $http.get("/api/users/me/")
        .success(function(response) {
          $scope.me = response;
          for (i = 0; i < $scope.me._amounts.length; ++i) {
            $scope.currentibecauseangularisdumb = i;
            $http.get("/api/ingredients/" + $scope.me._amounts[i].ingredientID) //todo: replace with current ingredientid
              .success(function(response) {
                $scope.currIng = response;
                $scope.ingredients.push({
                  "text": $scope.currIng.text,
                  "type": $scope.currIng.type,
                  "amount": $scope.me._amounts[$scope.currentibecauseangularisdumb].amount,
                  "unit": $scope.me._amounts[$scope.currentibecauseangularisdumb].unit,
                  "id": $scope.currIng.id
                });
                for(j = 0; j < $scope.dataIngredients.length; ++j){
                  if($scope.dataIngredients[j].id == $scope.currIng.id)
                    $scope.dataIngredients.splice(j, 1);
                }
              });
          }
        });

      $scope.addIng = function(item) {
        var index = $scope.dataIngredients.indexOf(item);
        var ing = $scope.dataIngredients[index];
        $scope.ingredients.push(ing);
        $scope.dataIngredients.splice(index, 1);
        $scope.me._amounts.push({
          "ingredientID": ing.id,
          "amount": ing.amount,
          "unit": "oz",
          "id": $scope.me._amounts.length + 1
        });
        $http.put("/api/users/me", $scope.me);
      };

      $scope.remove = function(item) {
        var index = $scope.ingredients.indexOf(item);
        $scope.dataIngredients.push($scope.ingredients[index]);
        for (i = 0; i < $scope.me._amounts.length; ++i) {
          if(item.id == $scope.me._amounts[i].ingredientID){
            $scope.me._amounts.splice(i, 1);
          }
        }
        $http.put("/api/users/me", $scope.me);
        $scope.ingredients.splice(index, 1);
      };
  });
