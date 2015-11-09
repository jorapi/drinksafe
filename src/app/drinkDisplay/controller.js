angular.module('RDash')
  .controller('drinkDisplayController', function($scope, $http) {

    $http.get("/api/drinks/" + $scope.drink)
      .success(function(response) {
        $scope.dataDrink = response;
      });
    $http.get("/api/drinks/" + $scope.drink + "/ingredients")
      .success(function(response) {
        $scope.dataIngredient = response;
      });



  });
