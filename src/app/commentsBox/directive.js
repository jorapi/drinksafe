angular.module('RDash')
.directive('commentsBox', function commentsBox(){
  return{
    templateUrl: 'templates/commentsBox/template.html',
    controller:'commentsBoxController',
    controllerAs:'commentsBoxCtrl',
    restrict:'E',
    scope:{
      drink:'=',
      topDisplay:'='
    }
  };
});
