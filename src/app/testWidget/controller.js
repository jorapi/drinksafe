
  angular.module('RDash')
  .controller('testWidgetController', function($scope, $http){
    var vm =this;
	
	$scope.test="asfa";
	fetch();
	$scope.test=$scope.details;
	
	
	function fetch() {
    $http.get("/api/Drinks/562ea33ab74b86f427f5c665")
     .success(function(response){$scope.details = response.name;});
	 }
  });
/**testing a new widget**/
