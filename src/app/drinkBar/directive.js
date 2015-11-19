angular.module('RDash')
.directive('drinkBar', function drinkSearch(){
  return{
    templateUrl: 'templates/drinkBar/template.html',
    controller:'drinkBarController',
    controllerAs:'drinkBarCtrl',
    restrict:'E',
    scope:{}
  };
});
