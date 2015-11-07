angular.module('RDash')
  .controller('drinkDisplayController', function($scope, $http){

   $scope.drinkID="5639023171458b09c5e459c1";
    $http.get("/api/drinks/"+$scope.drink)
      .success(function(response){
        $scope.dataDrink=response;
      });
      $http.get("/api/drinks/"+$scope.drink+"/ingredients")
        .success(function(response){
          $scope.dataIngredient=response;
        });
  });
