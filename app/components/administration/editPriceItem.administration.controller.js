(function () {
  'use strict';
  angular.module('myApp').controller('editPriceItemController', ['priceService', '$mdDialog', '$mdMedia', 'priceItem', function (priceService, $mdDialog, $mdMedia, priceItem) {
    var vm = this;
    
    vm.post = post;
    vm.hide = function () {
      $mdDialog.hide();
    };
    vm.cancel = function () {
      $mdDialog.cancel();
    };
    vm.savePost = function () {
      articleService.savePost(vm.post)
      $mdDialog.cancel();
    }
    
    return vm;
  }]);
})();