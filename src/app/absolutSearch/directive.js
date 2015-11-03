angular.module('RDash')
.directive('absolutSearch', function absolutSearch(){
  return{
    templateUrl: 'templates/absolutSearch/template.html',
    controller:'absolutSearchController',
    controllerAs:'absolutSearchCtrl',
    restrict:'E',
    scope:{}
  };
});
