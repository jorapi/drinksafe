
angular.module('RDash')
.controller('notificationController', function($scope, $http){
  $scope.isUserLoggedIn = false;
  $scope.notifications = [];
  $http.get("/auth/user")
    .success(function(response) {
      $scope.userJSON = response;
      if (response.profiles != null && response.profiles.length > 0) {
        $scope.isUserLoggedIn = true;
        $scope.currUser = response;
        for(i = 0; i < response._amounts.length; i++){
          if(response._amounts[i].amount < 3){
            $http.get("/api/ingredients/" + response._amounts[i].ingredientID)
              .success(function(response2) {
                if($scope.notifications.length < 9)
                  $scope.notifications.push("Low on " + response2.text);
              });
          }
        }
      }
    });
});
