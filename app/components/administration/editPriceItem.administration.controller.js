(function () {
  'use strict';
  angular.module('myApp').controller('editPriceItemController', ['priceService', 'workTypesService', '$mdDialog', '$mdMedia', 'priceItem', function (priceService, workTypesService, $mdDialog, $mdMedia, priceItem) {
    var vm = this;

    vm.priceItem = priceItem;
    vm.workTypes = [];

    vm.hide = function () {
      $mdDialog.hide();
    };

    vm.cancel = function () {
      $mdDialog.cancel();
    };

    vm.saveItem = function () {
      priceService.savePriceItem(vm.priceItem)
        .then(function (response) {
          $mdDialog.hide();
        });
    }

    workTypesService.getDataAsync().then(function (data) {
      vm.workTypes = data;
    });

    return vm;
  }]);
})();