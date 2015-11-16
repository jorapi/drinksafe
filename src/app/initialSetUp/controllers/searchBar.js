
  angular.module('RDash')
    .controller('SearchBar', function($scope, $http){

      $http.getElementsByClassName("api/drinks")
        .success(function(data){

          $scope.drinks = data;
        });

        $scope.filter= "";

        $scope.redirect = function(){
          if($scope.filter != ""){
            $location.redirect('drinkSearchController', $scope.blab );

          }
        };
    });
