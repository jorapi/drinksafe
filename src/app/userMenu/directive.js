angular.module('RDash')
.directive('userMenu', function userMenu(){
  return{
    templateUrl: 'templates/userMenu/template.html',
    controller:'userMenuController',
    controllerAs:'userMenuCtrl',
    restrict:'E',
    scope:{}
  };
});
