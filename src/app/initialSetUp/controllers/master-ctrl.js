/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$cookieStore', '$http', MasterCtrl]);


function MasterCtrl($scope, $cookieStore, $http) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.hideUserMenu = true;
    $http.get("/auth/user")
     .success(function(response){
       $scope.userJSON = response;
        if (response.profiles != null && response.profiles.length > 0){
          $scope.hideUserMenu = false;
          $scope.userFirstName = response.profiles[0].profile.displayName.split(" ")[0].toUpperCase();
          $scope.currentUser = response;
        }
      });

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.dataRec=[];
    $http.get("/api/drinks")
      .success(function(response){
        $scope.dat = response;
        if($scope.dat == null)return;
        for(i = $scope.dat.length; i> 0; i++){
          if($scope.dataRec.length < 5)
          $scope.dataRec.push($scope.dat[i]);
        }
      });

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    // $scope.drinkList=function() {
    //   angular.forEach($scope.drinks, function(drink, index){
    //     drink.expand=false;
    //   });
    // };

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
}
