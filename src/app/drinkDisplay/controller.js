angular.module('RDash')
  .controller('drinkDisplayController', function($scope, $http, $location) {
$scope.topDisplay=true;
$scope.urlData=$location.search();
    $http.get("/api/drinks/" + $scope.urlData.drinkId)
      .success(function(response) {
        $scope.dataDrink = response;
      });
    $http.get("/api/drinks/" + $scope.urlData.drinkId + "/ingredients")
      .success(function(response) {
        $scope.dataIngredient = response;
      });



  });
