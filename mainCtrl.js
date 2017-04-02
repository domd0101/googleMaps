angular.module('app1')
  .controller('mainCtrl',['$scope','$http',function($scope,$http){
    $scope.test='test';
    $scope.map;


    $scope.gMaps = (function(){
      (function myMap() {
          var mapProp= {
              center:new google.maps.LatLng(40.226058, -111.662261),
              zoom:15,
          };
      $scope.map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
        })();
    })();

  }])
  // var promise = $http.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyB2f09BzLRIDauS6VVvHpyMuzn1ZfVRocc&callback=myMap')
  //   return promise.then(function(results){
  //     $scope.map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  //     console.log('promise then');
  //   })
  // <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB2f09BzLRIDauS6VVvHpyMuzn1ZfVRocc&callback=myMap"
  //   type="text/javascript"></script>
