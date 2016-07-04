(function () {
  'use strict';
  angular.module('myApp').controller('loginController', ['$state', 'Authorization', loginController]);

  function loginController($state, Authorization) {
    var vm = this
    vm.userName = '';
    vm.password = '';
    vm.messageText = '';
    vm.login = function () {
      if (vm.userName == 'admin' && vm.password == 'admin') {
        Authorization.go('administration');
      }
      else {
        vm.messageText = 'Неправильный логин или пароль!';
      }
    };
    return vm;
  }
})();