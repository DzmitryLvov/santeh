(function () {
  'use strict';
  angular.module('myApp').controller('requestsAdministrationController', [
    '$mdDialog',
    '$mdMedia',
    'requestService',
    'notificationService',
    requestsAdministrationController]);

  function requestsAdministrationController($mdDialog, $mdMedia, requestService, notificationService) {
    var vm = this;

    var loadData = function () {
      requestService.getDataAsync().then(function (data) {
        vm.requestList = data;
      })
    }

    var loadTokens = function () {
      notificationService.getDataAsync().then(function (data) {
        vm.tokenList = data;
      })
    }

    vm.deleteRequest = function (request) {
      requestService.deleteItem(request).then(function (response) {
        loadData();
      })
    }

    vm.editTokenDialog = function (event, token) {
      var confirm = $mdDialog.prompt()
        .title('Добавление кода нотификации')
        .placeholder('Код нотификации')
        .ariaLabel('Код нотификации')
        .targetEvent(event)
        .initialValue(token.$value)
        .ok('Добавить')
        .cancel('Отмена');

      $mdDialog.show(confirm).then(function (result) {
        token.$value = result;
        notificationService.saveItem(token);
      });
    }

    vm.deleteToken = function (event, token) {
      var confirm = $mdDialog
        .confirm()
        .title('Вы действительно хотите удалить?')
        .textContent('Удаление кода')
        .ariaLabel('delete')
        .targetEvent(event)
        .ok('Удалить')
        .cancel('Отменить');

      $mdDialog.show(confirm).then(function () {
        notificationService.deleteItem(token).then(function (response) {
          loadTokens();
        })
      });
    }

    loadData();
    loadTokens();
    return vm;
  };
})();