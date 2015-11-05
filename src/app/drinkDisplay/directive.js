angular.module('RDash')
.directive('drinkDisplay', function drinkDispaly(){
  return{
    templateUrl: 'templates/drinkDisplay/template.html',
    controller:'drinkDisplayController',
    controllerAs:'drinkDisplayCtrl',
    restrict:'E',
    scope:{
      drink:'='
    }
  };
});
