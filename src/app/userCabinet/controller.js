angular.module('RDash')
  .controller('userCabinetController', function($scope, $http, $window) {
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
            $http.get("/api/ingredients/" + $scope.me._amounts[i].ingredientID)
              .success(function(response) {
                $scope.currIng = response;
                var currentamount = 0;
                for(k = 0; k < $scope.me._amounts.length; ++k){
                  if ($scope.me._amounts[k].ingredientID == $scope.currIng.id){
                    currentamount = $scope.me._amounts[k].amount;
                    break;
                  }
                }
                $scope.ingredients.push({
                  "text": $scope.currIng.text,
                  "type": $scope.currIng.type,
                  "isLiquid": $scope.currIng.isLiquid,
                  "amount": currentamount,
                  "id": $scope.currIng.id
                });
                for(j = 0; j < $scope.dataIngredients.length; ++j){
                  if($scope.dataIngredients[j].id == $scope.currIng.id)
                    $scope.dataIngredients.splice(j, 1);
                }
              });
          }
        });

        if($window.innerWidth <= 540){
        $scope.isMobile=true;
      }

      $scope.$watch(function(){
       return $window.innerWidth;
    }, function(value) {
      if(value <= 540){
        $scope.isMobile=true;
      }else{
        $scope.isMobile=false;
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
