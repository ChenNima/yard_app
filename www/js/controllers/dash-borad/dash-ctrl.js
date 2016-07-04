/**
 * Created by CYF on 16/7/4.
 */
angular.module('starter')

  .controller('DashCtrl', function ($scope,$location,localService) {

    $scope.$on('$ionicView.beforeEnter', function(){
      $scope.user = localService.getObject('user');
      if(_.isEmpty($scope.user)){
        $scope.$emit("login", false);
        $location.path('/login');
      }
    });

    $scope.logout = function (){
      localService.setObject('user',{});
      $scope.$emit("login", false);
      $location.path('/login');
    }
  });
