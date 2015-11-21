angular.module('RDash')
.directive('userFavorites', function userCabinet(){
  return{
    templateUrl: 'templates/userFavorites/template.html',
    controller:'userFavoritesController',
    controllerAs:'userFavCntrl',
    restrict:'E',
    scope:{}
  };
});
