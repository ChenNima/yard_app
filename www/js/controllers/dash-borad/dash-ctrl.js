/**
 * Created by CYF on 16/7/4.
 */
angular.module('starter')

  .controller('DashCtrl', function ($scope,$location,LocalVariable,NetworkSpeed) {

    $scope.signal =0;

    NetworkSpeed.getSpeed(function(data){
      $scope.signal = data;
    });

    $scope.logout = function (){
      LocalVariable.clearUser();
      $scope.$emit("login", false);
      $location.path('/login');
    }
  });
