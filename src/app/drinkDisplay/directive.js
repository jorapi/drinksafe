angular.module('RDash')
.directive('drinkDisplay', function drinkDisplay(){
  return{
    templateUrl: 'templates/drinkDisplay/template.html',
    controller:'drinkDisplayController',
    controllerAs:'drinkDisplayCtrl',
    restrict:'E',
    scope:{}
  };
});
