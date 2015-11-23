angular.module('RDash')
.directive('Features', function features(){
  return{
    templateUrl: 'templates/Features/template.html',
    controller:'featureController',
    controllerAs:'featureCntrl',
    restrict:'E',
    scope:{}
  };
});
