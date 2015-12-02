angular.module('RDash')
  .controller('drinkSearchController', function($scope, $http, $anchorScroll, $location, $routeParams, $stateParams) {


    $http.get("api/drinks")
      .success(function(data) {
        $scope.drinks = data;
      });
    $scope.filter = "name";
    $scope.limit=10;
    $scope.search="";
    $scope.ingredients = [];


    $http.get("/api/ingredients")
      .success(function(response) {
        $scope.dataIngredients = response;
      });

    // $scope.gotoAnchor = function(x) {
    //   var newHash = 'anchor' + x;
    //   if ($location.hash() !== newHash) {
    //     // set the $location.hash to `newHash` and
    //     // $anchorScroll will automatically scroll to it
    //     $location.hash('anchor' + x);
    //   } else {
    //     // call $anchorScroll() explicitly,
    //     // since $location.hash hasn't changed
    //     $anchorScroll();
    //   }
    // };
    if($location.search().search != null){
      $scope.search = $location.search().search;
    }

    $scope.redirect=function(id){
    //  $location.search('drinkId', id);
      $location.path("/drinkView").search({drinkId: id});
    };

    $scope.filterFunction = function(element){
      if($scope.ingredients.length>0){
        var hold=[];
        for(var i = 0; i < element._amounts.length; ++i){
          hold.push(element._amounts[i].ingredientID);
        }
        for(var i = 0; i < $scope.ingredients.length; ++i){
          if(hold.indexOf($scope.ingredients[i])===-1){
            return false;
          }
        }
      }
      if($scope.search.length<=0){
        return true;
      }
      if (element.name.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 || element.description.toLowerCase().indexOf($scope.search.toLowerCase()) > -1){
        return true;
      }else{
        return false;
      }
    };

    $scope.addIng = function(id){
      $scope.ingredients.push(id);
    };

    $scope.unexpand=function() {
      angular.forEach($scope.drinks, function(drink, index){
        drink.expand=false;
      });
    };
  });
