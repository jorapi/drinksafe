
angular.module('RDash')
.controller('userImageController', function($scope, $http){
  var vm =this;
  getUserImage();

  function getUserImage() {
    $scope.userImgURL = "img/avatar.jpg";
    $http.get("/auth/user")
     .success(function(response){$scope.userImgURL = "//graph.facebook.com/" + response.profiles[0].externalId + "/picture";});
	 }
});
