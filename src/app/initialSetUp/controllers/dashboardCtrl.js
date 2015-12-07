angular.module('RDash')
  .controller('dashBoardController', function($scope, $http){
    $scope.dataRec=[];
    $http.get("/api/drinks")
      .success(function(response){
        $scope.dat = response;
        if($scope.dat == null)return;
        for(i = Scope.dat.length; i > 0; && i < 5; i++){
          $scope.dataRec.push($scope.dat[i]);
        }
      });
    )
