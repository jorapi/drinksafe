angular.module('RDash')
  .controller('drinkBarController', function($scope, $http, $location, $window) {


    $http.get("api/drinks")
      .success(function(data) {
        $scope.drinks = data;
      });

      if($window.innerWidth < 460){
        $scope.isMobile=true;
      }

      $scope.$watch(function(){
       return $window.innerWidth;
    }, function(value) {
      if(value < 460){
        $scope.isMobile=true;
      }else{
        $scope.isMobile=false;
      }
   });

    $scope.selectedDrink = function(selected) {
      if (selected) {
        $location.path("/drinkView").search({drinkId: selected.originalObject.id});
      }else {
        console.log('cleared');
      }
    };
  });
