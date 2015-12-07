angular
  .module('RDash')
  .directive('dash', dash);

  function dash(){
    controller:'dashBoardController',
    controllerAs:'dashBoardCntrl',
    restrict:'E',
    scope:{}
  };
      return directive;
  };
