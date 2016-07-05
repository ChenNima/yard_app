/**
 * Created by CYF on 16/7/5.
 */
angular.module('starter')
  .controller('ChatCtrl',function ($scope,Restangular,LocalVariable,socketService,DataFormat) {
    var user = LocalVariable.getUser();

    $scope.data={};

    $scope.data.name = user.nickName;

    socketService.reconnect();

    socketService.emit('login',{userName:user.nickName});

    socketService.on('chats',function(data){
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
  });
