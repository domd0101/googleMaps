angular.module('app1')
  .controller('mainCtrl',['$scope','$http',function($scope,$http){
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
          var mapOptions = { center: center, zoom: 10 };
          var marker = new google.maps.Circle({
                center: center,
                radius: 8000,
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

    ///&radius=500&type=restaurant&keyword=cruise&key=

  }])
