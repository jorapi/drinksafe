angular.module('RDash')
  .controller('userCabinetController', function($scope, $http) {
    //check if user is logged in
    $scope.hideUserMenu = true;
    $http.get("/auth/user")
     .success(function(response){
       $scope.userJSON = response;
        if (response.profiles != null && response.profiles.length > 0){
          $scope.hideUserMenu = false;
        }
        $http.get("api/drinks")
          .success(function(data) {
            $scope.userIngredients = data;
        });
      });
  });
