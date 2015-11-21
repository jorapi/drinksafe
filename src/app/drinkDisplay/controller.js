angular.module('RDash')
  .controller('drinkDisplayController', function($scope, $http, $location) {
$scope.urlData=$location.search();
$scope.topDisplay=true;
$scope.favorited=false;
$scope.hideHeart = true;
$http.get("/auth/user")
 .success(function(response){
   $scope.currentUser = response;
    if (response.profiles != null && response.profiles.length > 0){
      $scope.hideHeart = false;
      if ($scope.currentUser.favoriteDrinks != null &&
          $scope.currentUser.favoriteDrinks.indexOf($scope.urlData.drinkId) > -1)
        $scope.favorited = true;
    }
  });
    $http.get("/api/drinks/" + $scope.urlData.drinkId)
      .success(function(response) {
        $scope.dataDrink = response;
      });
    $http.get("/api/drinks/" + $scope.urlData.drinkId + "/ingredients")
      .success(function(response) {
        $scope.dataIngredient = response;
      });

      $scope.favorite=function() {
        if(!$scope.favorited){
          if ($scope.currentUser.id != $scope.dataDrink.userId){
            //we made it so we can't favorite it
            return;
          }
          if ($scope.currentUser.favoriteDrinks == null)
            $scope.currentUser.favoriteDrinks = [];
          $scope.currentUser.favoriteDrinks.push($scope.urlData.drinkId);
        } else {
          var i = $scope.currentUser.favoriteDrinks.indexOf($scope.urlData.drinkId);
          $scope.currentUser.favoriteDrinks.splice(i, 1);
        }
        $http.put("/api/users/me", $scope.currentUser);
        $scope.favorited = !$scope.favorited;
      };

  });
