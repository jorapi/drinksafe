angular.module('RDash')
  .controller('drinkSearchController', function($scope, $http, $anchorScroll, $location, $routeParams, $stateParams) {


    $http.get("api/drinks")
      .success(function(data) {
        $scope.drinks = data;
      });
    $scope.filter = "name";
    $scope.limit=10;

    // $scope.gotoAnchor = function(x) {
    //   var newHash = 'anchor' + x;
    //   if ($location.hash() !== newHash) {
    //     // set the $location.hash to `newHash` and
    //     // $anchorScroll will automatically scroll to it
    //     $location.hash('anchor' + x);
    //   } else {
    //     // call $anchorScroll() explicitly,
    //     // since $location.hash hasn't changed
    //     $anchorScroll();
    //   }
    // };
<<<<<<< HEAD
    if($location.search().search != null){
      $scope.search = $location.search().search;
    }
=======
$scope.redirect=function(id){

//  $location.search('drinkId', id);
  $location.path("/drinkView").search({drinkId: id});
};
>>>>>>> origin/master

    $scope.unexpand=function() {
      angular.forEach($scope.drinks, function(drink, index){
        drink.expand=false;
      });
    };
  });
