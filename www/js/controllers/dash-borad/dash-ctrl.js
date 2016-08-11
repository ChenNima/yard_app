/**
 * Created by CYF on 16/7/4.
 */
angular.module('starter')

  .controller('DashCtrl', function ($scope,$location,LocalVariable,NetworkSpeed,$cordovaGeolocation,$cordovaNetwork,$ionicPlatform,$cordovaDeviceMotion) {

    $scope.signal =0;
    $scope.lat =0;
    $scope.long =0;
    $scope.type =0;
    $scope.X =0;
    $scope.Y =0;
    $scope.Z =0;


    var posOptions = {timeout: 10000, enableHighAccuracy: true};

    NetworkSpeed.getSpeed(function(data){
      $scope.signal = data;
    });

    $ionicPlatform.ready(function() {

      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          $scope.lat  = position.coords.latitude
          $scope.long = position.coords.longitude
        }, function(err) {
          // error
        });

      try{
        $scope.netType = $cordovaNetwork.getNetwork();
      }catch(e) {
        console.log(e);
      }

      $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
        $scope.X = result.x;
        $scope.Y = result.y;
        $scope.Z = result.z;
        var timeStamp = result.timestamp;
      }, function(err) {
        // An error occurred. Show a message to the user
      });

      //var isOnline = $cordovaNetwork.isOnline();
      //
      //var isOffline = $cordovaNetwork.isOffline();
    });

    $scope.logout = function (){
      LocalVariable.clearUser();
      $scope.$emit("login", false);
      $location.path('/login');
    }
  });
