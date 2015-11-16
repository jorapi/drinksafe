angular.module('RDash')
  .controller('commentsBoxController', function($scope, $http, $location) {
      //below needs to change to the current url
      $scope.commentURL = "http://drinksafe.herokuapp.com" + $location.path();
  });
