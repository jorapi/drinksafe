angular.module('RDash')
.directive('features', function features(){
  return{
    templateUrl: 'templates/features/template.html',
    controller:'featuresController',
    controllerAs:'featuresCntrl',
    restrict:'E',
    scope:{}
  };
});
