angular.module('RDash')
.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
])
.controller('absolutSearchController', function($scope, $http){
  // $http.get('http://addb.absolutdrinks.com/drinks/?apiKey=80199aea7e7b4509b14125f474a6c088', function(data){
  //   console.log(data);
  //   $scope.drinks = data.result;
  // });

  $scope.drinkList  = [];
  $http.get("api/drinks")
    .success(function(data){
      console.log(data);
      $scope.drinks = data;
    });
    $scope.addDrink=function(item){
      var index=$scope.drinks.indexOf(item);
      var drink=$scope.drinks[index];
      $scope.drinkList.push(drink);
      $scope.drinks.splice(index,1);
    };
    $scope.removeDrink=function(item){
      var index=$scope.drinkList.indexOf(item);
      $scope.drinks.push($scope.drinkList[index]);
      $scope.ingredients.splice(index,1);
    };


});
