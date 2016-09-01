(function () {
  'use strict';
  angular.module('myApp').controller('workTypesHouseController', ['$controller', '$stateParams', workTypesHouseController])

  function workTypesHouseController($controller, $stateParams) {
    var vm = this;

    $controller('WorkTypesBaseController', {
      vm: vm
    });

    vm.getData(2, $stateParams.workTitle).then(function (data) {
      data.forEach(function (element, index, array) {
        element.thumbText = element.thumbText.replace('-', '');
      })
    });

    return vm;
  };
})();