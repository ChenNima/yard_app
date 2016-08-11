/**
 * Created by CYF on 16/7/4.
 */
angular.module('starter')

  .controller('DashCtrl', function ($scope,$location,LocalVariable,NetworkSpeed,$cordovaGeolocation,$cordovaNetwork,$ionicPlatform) {

    $scope.signal =0;
    $scope.lat =0;
    $scope.long =0;
    $scope.type =0;


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
