angular.module('RDash')
.controller('drinkSearchController', function($scope, $http, $anchorScroll, $location){

  $http.get("api/drinks")
    .success(function(data){
      $scope.drinks = data;
    });
    $scope.filter="name";
    $scope.test="afasdf";
    //$scope.holdID = $;


    $scope.gotoAnchor = function(x) {
      var newHash = 'anchor' + x;
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash('anchor' + x);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }
    };
});
