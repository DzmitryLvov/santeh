(function () {
  'use strict';
  angular.module('myApp').controller('workTypesController', ['$controller', '$stateParams', workTypesController])

  function workTypesController($controller, $stateParams) {
    var vm = this;

    $controller('WorkTypesBaseController', {
      vm: vm
    });

    vm.getData(1, $stateParams.workTitle);

    return vm;
  };
})();