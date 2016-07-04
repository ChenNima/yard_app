angular.module('starter')
  .controller('LoginCtrl', function ($scope, $location,$ionicPopup,$ionicLoading, Restangular, localService) {
    $scope.$on('$ionicView.beforeEnter', function(){
      if(!_.isEmpty(localService.getObject('user'))){
        $location.path('/');
      }
    });

      $scope.user = {
        name: '',
        pass: ''
      };

      $scope.login = function () {
        $ionicLoading.show({
          template: 'Loading...'
        });
        Restangular.one('login').get($scope.user)
          .then(function (data) {
              $ionicLoading.hide();
              localService.setObject('user',data);
              $scope.$emit("login", true);
              $location.path('/');
          },
          function(err){
            $ionicLoading.hide();
            $ionicPopup.confirm({
              title: 'Login Failed',
              template: err.data.message
            });
          })
      };

    }
  );
