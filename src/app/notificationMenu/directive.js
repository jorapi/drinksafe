angular.module('RDash')
.directive('notificationMenu', function notificationMenu(){
  return{
    templateUrl: 'templates/notificationMenu/template.html',
    controller:'notificationMenuController',
    controllerAs:'notificationMenuCtrl',
    restrict:'E',
    scope:{}
  };
});
