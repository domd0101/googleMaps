angular.module('app1')
  .controller('mainCtrl',['$scope','$http',function($scope,$http){
    $scope.map;

    $scope.current = (function(){
      var promise = $http.get('http://ip-api.com/json');
        return promise.then(function(result){
          $scope.num = 'one';
          $scope.data = result.data;
          $scope.gMaps($scope.data,$scope.num);
        })
    })();

    $scope.gMaps = function(data,para){
      (function myMap() {
        if(para==='one'){
          var mapProp = {
            center: new google.maps.LatLng($scope.data.lat, $scope.data.lon),
            zoom: 12,
          }
        }
        else if(para==='two'){
           var mapProp = {
              center: new google.maps.LatLng($scope.data.lat, $scope.data.lng),
              zoom:12
          }
        }
        $scope.map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
          })();
        }
            ///++++Render Original Map+++++////

      //   var request = {
      //        types: ['restaurant']
      //      };
      //  infowindow = new google.maps.InfoWindow();
      //      places = new google.maps.places.PlacesService($scope.map);
      //     places.nearbySearch(request,);
          // centerMarker = new google.maps.Marker({
          //     position: center,
          //     animation: google.maps.Animation.DROP,
          //     map: map
          //   });
          // }



    $scope.newloc = function(zip){
      var zip = zip;
      var promise = $http.get("http://ziplocate.us/api/v1/"+zip+"");
        return promise.then(function(result){
          console.log('working');
          $scope.data = result.data;
          $scope.num = 'two';
          $scope.gMaps($scope.data,$scope.num);
        })
    }

    // $scope.food = function(some){
    //   var somefood = some;
    //
    // }



    ///&radius=500&type=restaurant&keyword=cruise&key=

  }])
