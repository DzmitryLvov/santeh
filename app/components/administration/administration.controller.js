(function () {
  'use strict';
  angular.module('myApp').controller('administrationController', [
    '$mdDialog',
    '$mdMedia',
    '$rootScope',
    administrationController]);

  function administrationController($mdDialog, $mdMedia, $rootScope) {
    var vm = this;

    vm.logOut = function () {
      var confirm = $mdDialog
        .confirm()
        .title('Вы действительно хотите выйти?')
        .textContent('выход из системы')
        .ariaLabel('Lucky day')
        .targetEvent(event)
        .ok('Выйти').cancel('Остаться');

      $mdDialog.show(confirm).then(function () {
        $rootScope.logout();
      }, function () {});
    };

    return vm;
  };
})();