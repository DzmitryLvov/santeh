(function () {
  'use strict';
  angular.module('myApp').controller('aboutController', ['aboutService', function(aboutService) {
    var vm = this;
    vm.displayItem = function (item) {
      if (item) {
        item.selected = true;
        if (vm.selectedItem) {
          vm.selectedItem.selected = false;
        }
        vm.selectedItem = item;
      }
    }
    vm.data = aboutService.preparedData;
    vm.displayItem(vm.data[0]);
    vm.aboutText = aboutService.aboutText;
    return vm;
  }]);
})();