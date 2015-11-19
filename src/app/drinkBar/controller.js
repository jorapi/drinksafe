angular.module('RDash')
  .controller('drinkBarController', function($scope, $http, $location) {


    $http.get("api/drinks")
      .success(function(data) {
        $scope.drinks = data;
      });
    $scope.selectedDrink = function(selected) {
      if (selected) {
        $location.path("/drinkView").search({drinkId: selected.originalObject.id});
      }else {
        console.log('cleared');
      }
    };
  });
