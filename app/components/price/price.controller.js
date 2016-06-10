(function () {
  'use strict';

  angular.module('myApp')
    .controller('priceController', priceController);

  function priceController(priceService) {
    var vm = this;

    vm.priceList = priceService.cardItems;

    return vm;
  }
})();