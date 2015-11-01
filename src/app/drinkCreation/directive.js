angular.module('RDash')
.directive('drinkCreation', function drinkCreation(){
  return{
    templateUrl: 'templates/drinkCreation/template.html',
    controller:'drinkCreationController',
    controllerAs:'drinkCreationCtrl',
    restrict:'E',
    scope:{}
  };
});
