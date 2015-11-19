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
})
.directive('dynFbCommentBox', function () {
    function createHTML(href, numposts, width, colorscheme) {
        return '<div class="fb-comments" ' +
                       'data-href="' + href + '" ' +
                       'data-numposts="' + numposts + '" ' +
                       'data-width="' + width + '" ' +
                       'data-colorsheme="' + colorscheme + '">' +
               '</div>';
    }

    return {
        restrict: 'A',
        scope: {},
        link: function postLink(scope, elem, attrs) {
            attrs.$observe('pageHref', function (newValue) {
                var href        = newValue;
                var numposts    = attrs.numposts    || 5;
                var width    = attrs.width    || "100%";
                var colorscheme = attrs.colorscheme || 'light';

                elem.html(createHTML(href, numposts, width, colorscheme));
                FB.XFBML.parse(elem[0]);
            });
        }
    };
});
