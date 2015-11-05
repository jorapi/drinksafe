angular.module('RDash')
.directive('drinkSearch', function drinkSearch(){
  return{
    templateUrl: 'templates/drinkSearch/template.html',
    controller:'drinkSearchController',
    controllerAs:'drinkSearchCtrl',
    restrict:'E',
    scope:{}
  };
});
