/**
 * Created by CYF on 16/7/4.
 */
angular.module('starter')

  .controller('DashCtrl', function ($scope,$location,LocalVariable,NetworkSpeed,$cordovaGeolocation) {

    $scope.signal =0;
    $scope.lat =0;
    $scope.long =0;


    var posOptions = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        $scope.lat  = position.coords.latitude
        $scope.long = position.coords.longitude
      }, function(err) {
        // error
      });

    NetworkSpeed.getSpeed(function(data){
      $scope.signal = data;
    });

    $scope.logout = function (){
      LocalVariable.clearUser();
      $scope.$emit("login", false);
      $location.path('/login');
    }
  });
