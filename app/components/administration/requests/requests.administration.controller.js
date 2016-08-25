(function () {
  'use strict';
  angular.module('myApp').controller('requestsAdministrationController', [
    '$mdDialog',
    '$mdMedia',
    'requestService',
    requestsAdministrationController]);

  function requestsAdministrationController($mdDialog, $mdMedia, requestService) {
    var vm = this;

    var loadData = function () {
      requestService.getDataAsync().then(function (data) {
        vm.requestList = data;
      })
    }

    vm.deleteRequest = function (request) {
      requestService.deleteItem(request).then(function (response) {
        loadData();
      })
    }

    loadData();
    return vm;
  };
})();