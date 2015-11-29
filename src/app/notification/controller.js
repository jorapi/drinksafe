
angular.module('RDash')
.controller('notificationController', function($scope, $http){
  $scope.isUserLoggedIn = false;
  $http.get("/auth/user")
    .success(function(response) {
      $scope.userJSON = response;
      if (response.profiles != null && response.profiles.length > 0) {
        $scope.isUserLoggedIn = true;

      }
    });
});
