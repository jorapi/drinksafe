
angular.module('RDash')
.controller('userImageController', function($scope, $http){
  var vm =this;
  getUserImage();

  function getUserImage() {
    $scope.userImgURL = "img/avatar.jpg";
    $http.get("/auth/user")
     .success(function(response){if(response.profiles != null)
       $scope.userImgURL = "//graph.facebook.com/" +
       response.profiles[0].externalId + "/picture";});
	 }
});
