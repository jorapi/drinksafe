angular.module('RDash')
.directive('userCabinet', function userCabinet(){
  return{
    templateUrl: 'templates/userCabinet/template.html',
    controller:'userCabinetController',
    controllerAs:'userCabCtrl',
    restrict:'E',
    scope:{}
  };
});
