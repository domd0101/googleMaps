app1.controller('mainCtrl',['$scope','$http',function($scope,$http){

    $scope.map;

    $scope.current = (function(){
      var promise = $http.get('http://ip-api.com/json');
        return promise.then(function(result){
          $scope.num = 'one';
          $scope.data1 = result.data;
          $scope.gMaps($scope.data1,$scope.num);
        })
    })();


    $scope.gMaps = function(data,para){
      (function myMap() {
        if(para==='one'){
           var center = new google.maps.LatLng($scope.data1.lat, $scope.data1.lon);
           var mapOptions = { center: center, zoom: 11 };
           var marker = new google.maps.Circle({
                 center: center,
                 radius: 3000,
                 strokeColor: "Coral ",
                 strokeOpacity: 0.8,
                 strokeWeight: 2,
                 fillColor: "Coral",
                 fillOpacity: 0.4,
                 map: $scope.map
           });
           var map = new google.maps.Map(document.getElementById("googleMap"),mapOptions);
           $scope.map = marker.setMap(map);
         }



        else if(para==='two'){
              var center = new google.maps.LatLng($scope.data.lat, $scope.data.lng);
              var mapOptions = { center: center, zoom: 10 };
              var marker = new google.maps.Marker({
                position: center,
                map: $scope.map
              });
              var map = new google.maps.Map(document.getElementById("googleMap"),mapOptions);
              $scope.map = marker.setMap(map);
              ////// new new ++++++++++++++++ new new ////////
                    $scope.infowindow;

                    $scope.taco = function(para){
                      $scope.food = '';
                      $scope.tacotype = para;

                      $scope.initMap = function() {
                      var mycenter = {lat: $scope.data.lat, lng: $scope.data.lng};
                      console.log('initMap called');

                      $scope.map = new google.maps.Map(document.getElementById('googleMap'), {
                        center: mycenter,
                        zoom: 10
                      });

                      $scope.infowindow = new google.maps.InfoWindow();
                      var service = new google.maps.places.PlacesService($scope.map);
                      service.nearbySearch({
                        location: mycenter,
                        radius: 10000,
                        type: [$scope.tacotype]
                      }, callback);
                      console.log('nearbySearch called');
                    }

                    function callback(results, status) {
                      console.log('callback called');
                      if (status === google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                          createMarker(results[i]);
                        }
                      }
                    }

                    function createMarker(place) {
                      var placeLoc = place.geometry.location;
                      var marker = new google.maps.Marker({
                        map: $scope.map,
                        position: place.geometry.location
                      });

                      google.maps.event.addListener(marker, 'click', function() {
                        $scope.infowindow.setContent(place.name);
                        $scope.infowindow.open($scope.map, this);
                      });
                      console.log('createMarker called');

                    }
                    // $scope.map = marker.setMap(map)
                    $scope.initMap();
                  }
                }
            })();
          }


          ///++++Render Original Map+++++////

    $scope.newloc = function(zip){
      var zip = zip;
      var promise = $http.get("http://ziplocate.us/api/v1/"+zip+"");
      $scope.zip1 = '';
        return promise.then(function(result){
          $scope.data = result.data;
          $scope.num = 'two';
          $scope.gMaps($scope.data,$scope.num);
        })
    }


  }])
