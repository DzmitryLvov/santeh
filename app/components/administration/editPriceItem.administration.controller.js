(function () {
  'use strict';
  angular.module('myApp').controller('editPriceItemController', ['priceService', '$mdDialog', '$mdMedia', 'priceItem', function (priceService, $mdDialog, $mdMedia, priceItem) {
    var vm = this;
    
    vm.priceItem = priceItem;
    
    vm.hide = function () {
      $mdDialog.hide();
    };
    
    vm.cancel = function () {
      $mdDialog.cancel();
    };
    
    vm.saveItem = function () {
      priceService.savePriceItem(vm.priceItem)
      $mdDialog.cancel();
    }
    
    return vm;
  }]);
})();