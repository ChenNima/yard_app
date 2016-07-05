/**
 * Created by CYF on 16/7/4.
 */
angular.module('starter')
.controller('HomeCtrl',function($scope,$location,LocalVariable){
  $scope.logStatus = true;

  LocalVariable.refresh();

  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.user = LocalVariable.getUser();
    if(_.isEmpty($scope.user)){
      $scope.logStatus = false;
      $location.path('/login');
    }
  });

  $scope.$on("login",
    function (event, msg) {
      if(msg){
        $scope.user = LocalVariable.getUser();
      }
      $scope.logStatus = msg;
    });
});
