angular.module('RDash')
.directive('userImage', function userImage(){
  return{
    templateUrl: 'templates/userImage/template.html',
    controller:'userImageController',
    controllerAs:'userImgCtrl',
    restrict:'E',
    scope:{}
  };
});
