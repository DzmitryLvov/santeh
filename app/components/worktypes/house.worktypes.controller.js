(function () {
  'use strict';
  angular.module('myApp').controller('workTypesHouseController', ['$controller', '$stateParams', workTypesHouseController])

  function workTypesHouseController($controller, $stateParams) {
    var vm = this;

    $controller('WorkTypesBaseController', {
      vm: vm
    });

    vm.getData(2, $stateParams.workTitle);

    return vm;
  };
})();