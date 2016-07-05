angular.module('starter')
  .controller('LoginCtrl', function ($scope, $location,$ionicPopup,$ionicLoading, Restangular, LocalVariable) {
    $scope.$on('$ionicView.beforeEnter', function(){
      if(!_.isEmpty(LocalVariable.getUser())){
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
              LocalVariable.saveUser(data);
              $scope.$emit("login", true);
              $location.path('/');
          },
          function(err){
            $ionicLoading.hide();
            if(err.status==-1){
              $ionicPopup.confirm({
                title: 'Login Failed',
                template: '无网络连接'
              });
              return
            }
            $ionicPopup.confirm({
              title: 'Login Failed',
              template: err.data.message
            });
          })
      };

    }
  );
