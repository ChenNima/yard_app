/**
 * Created by CYF on 16/7/5.
 */
angular.module('LocalVariable', [])
  .factory('LocalVariable', [
    'localService',
    function (localService) {
      var user = {};

      var service = {
        refresh: function () {
          user = localService.getObject('user');
          return user;
        },

        getUser: function () {
          return _.isEmpty(user) ? {} : {
            name: user.name,
            nickName: user.nick_name,
            role: user.role
          }
        },

        setUser: function (newUser) {
          user = newUser;
        },

        saveUser: function (newUser) {
          this.setUser(newUser);
          localService.setObject('user', newUser);
        },

        clearUser: function () {
          user = {};
          localService.setObject('user', {});
        }
      };

      return service;
    }
  ]);
