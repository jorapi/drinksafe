angular.module('RDash')
.directive('notification', function userImage(){
  return{
    templateUrl: 'templates/notification/template.html',
    controller:'notificationController',
    controllerAs:'notCtrl',
    restrict:'E',
    scope:{}
  };
});
