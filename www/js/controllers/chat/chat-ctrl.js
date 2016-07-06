/**
 * Created by CYF on 16/7/5.
 */
angular.module('starter')
  .controller('ChatCtrl',function ($scope,$ionicLoading,Restangular,LocalVariable,socketService,DataFormat) {
    var user = LocalVariable.getUser();

    var sendData;

    $scope.data={};

    $scope.data.name = user.nickName;

    $ionicLoading.show({
      template: 'Loading...'
    });

    socketService.reconnect();

    socketService.emit('login',{userName:user.nickName});

    socketService.on('chats',function(data){
      $ionicLoading.hide();
      if ($scope.datas &&  _.last(data)._id!=_.last($scope.datas)._id && _.last(data).name != $scope.data.name){
        //showNotify(_.last(data).name+": "+_.last(data).content);
      }
      if(!$scope.datas || _.last(data)._id!=_.last($scope.datas)._id){
        $scope.datas = DataFormat.format(data);
      }
    });

    socketService.on('chat_added',function(data){
      console.log('posted');
      //$scope.toSend.splice(0,1);
    });

    socketService.on('user_login_change',function(data){
      $scope.onlineUsers = data;
    });

    $scope.send = function(){
      var myDate = new Date();
      var time = myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
      $scope.data.date = time;
      sendData = deepCopy($scope.data);
      $scope.data.content = "";
      socketService.emit('add_new',{
        data : sendData
      })
    };

    var deepCopy = function (source) {
      var result = {};
      for (var key in source) {
        result[key] = typeof source[key] === 'object' ? deepCoyp(source[key]) : source[key];
      }
      return result;
    };
  });
