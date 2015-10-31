
angular.module('RDash')
.controller('userMenuController', function($scope, $http){
  var vm =this;
  $scope.userMenuIsLoggedIn = false;
  $http.get("/auth/user")
   .success(function(response){
     $scope.userJSON = response;
      if (response.profiles.length > 0){
        $scope.userMenuIsLoggedIn = true;
      }
    });
});
