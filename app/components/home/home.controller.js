(function () {
  'use strict';

  angular.module('myApp')
    .controller('homeController', homeController);

  function homeController(homeService) {
    var vm = this

    vm.info = homeService.getInfo();

    return vm;
  }
})();