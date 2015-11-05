


  angular.module('RDash')
  .directive('passObject', function testWidget(){
    return{
      restrict: 'E',
          scope: { obj: '=' },
          template: '<div>Hello, {{obj.prop}}!</div>'
    };
  });
