


  angular.module('RDash')
  .directive('testWidget', testWidget);

  function testWidget(){
    return{
      templateUrl: 'templates/testWidget/template.html',
      controller:'testWidgetController',
      controllerAs:'testCtrl',
      restrict:'E',
      scope:{}
    };
  };
