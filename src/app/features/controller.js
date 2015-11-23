angular.module('RDash')
  .controller('featuresController', function($scope, $http){
    $scope.dataRec=[];
    $http.get("/api/drinks")
      .success(function(response){
        $scope.dat = response;
        if($scope.dat == null)return;
        for(i = 0; i< 10; i++){
          $scope.dataRec.push($scope.dat[i]);
        }
      });

      function callback(results, status){
        if(status==google.maps.places.PlacesServiceStatus.OK){
          for(var i = 0; i<results.length; i++){
            var plcae = results[i];
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place){
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }

      function SearchForm($scope){
        $scope.location ='';
        $scope.doSearch = function(){
          if($scope.location===''){
            alert('Could not obtain your location');
          }
          else{
            var pyrmont = new google.maps.LatLng($scope.location);
            map = new google.maps.Map(document.getElementById('map'), {
              center: pyrmont,
              zoom: 15
            });
            var request = {
              location: pyrmont,
              radius: "100",
              types: ['liquor-store']
            };
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
          }
        }
      }
  })
