(function () {
  'use strict';
  angular.module('myApp').controller('homeController', ['homeService', homeController]);

  function homeController(homeService) {
    var vm = this
    vm.info = homeService.getInfo();
    return vm;
  }
})();