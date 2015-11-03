angular.module('RDash')
.controller('absolutSearchController', function($scope, $http){
  // $.get('http://addb.absolutdrinks.com/drinks/?apiKey=80199aea7e7b4509b14125f474a6c088', function(data){
  //   console.log(data);
  //   $scope.drinks = data.result;
  // });
  $http.get("api/drinks")
    .success(function(data){
      console.log(data);
      $scope.drinks = data;
    });
});
