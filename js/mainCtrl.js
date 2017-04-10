app1.controller('mainCtrl',['$scope','$http','mainService',function($scope,$http,mainService){
    $scope.map;
    $scope.day = mainService.day;
    $scope.night = mainService.night;
    $scope.mode = $scope.day;
    $scope.modes = function(mode){
      if(mode==='day'){
        $scope.mode = $scope.day;
        $scope.gMaps($scope.data1,$scope.num)
      }
      else if(mode==='night'){
        $scope.mode = $scope.night;
        $scope.gMaps($scope.data1,$scope.num)
      }
    }


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
           var mapOptions = {
             center: center,
              zoom: 13,
              styles: $scope.mode
             };
           var image = 'http://maps.google.com/intl/en_us/mapfiles/ms/micons/blue.png';
           var marker = new google.maps.Marker({
                 draggable: true,
                 animation: google.maps.Animation.BOUNCE,
                 position: center,
                 icon: image,
                 map: $scope.map
           });
           var map = new google.maps.Map(document.getElementById("googleMap"),mapOptions);
           $scope.map = marker.setMap(map);
           /// search stufff

         }



        else if(para==='two'){
              var center = new google.maps.LatLng($scope.data.lat, $scope.data.lng);
              var mapOptions = {
                center: center,
                 zoom: 12,
                 styles: $scope.mode
               };
              var image = 'http://maps.google.com/intl/en_us/mapfiles/ms/micons/blue.png';
              var marker = new google.maps.Marker({
                position: center,
                map: $scope.map,
                icon: image,
                animation:google.maps.Animation.BOUNCE
              });
              var map = new google.maps.Map(document.getElementById("googleMap"),mapOptions);
              $scope.map = marker.setMap(map);
              ////// new new ++++++++++++++++ new new ////////

                    $scope.infowindow;
                    $scope.taco = function(para){
                      $scope.zipshow = true;
                      $scope.food = '';
                      $scope.tacotype = para;

                      $scope.initMap = function() {
                      var mycenter = {lat: $scope.data.lat, lng: $scope.data.lng};
                      console.log('initMap called');
                      $scope.map = new google.maps.Map(document.getElementById('googleMap'), {
                        center: mycenter,
                        zoom: 12,
                        styles: $scope.mode
                      });

                      $scope.infowindow = new google.maps.InfoWindow();
                      var service = new google.maps.places.PlacesService($scope.map);
                      service.textSearch({
                        location: mycenter,
                        radius: 10000,
                        query: [$scope.tacotype]
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
                      var image = 'http://maps.google.com/intl/en_us/mapfiles/ms/micons/blue.png';
                      var marker = new google.maps.Marker({
                        map: $scope.map,
                        position: place.geometry.location,
                        icon: image
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
                  //here
                }
            })();
          }


          ///++++Render Original Map+++++////

    $scope.newloc = function(zip){
      var zip = zip;
      var promise = $http.get("http://ziplocate.us/api/v1/"+zip+"");
        return promise.then(function(result){
          $scope.data = result.data;
          $scope.num = 'two';
          $scope.gMaps($scope.data,$scope.num);
        })
    }


  }])
