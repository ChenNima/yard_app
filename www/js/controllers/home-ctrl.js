/**
 * Created by CYF on 16/7/4.
 */
angular.module('starter')
.controller('HomeCtrl',function($scope,$location,localService){
  $scope.logStatus = true;

  $scope.$on("login",
    function (event, msg) {
      if(msg){
        $scope.user = localService.getObject('user');
      }
      $scope.logStatus = msg;
    });
});
