(function () {
  'use strict';

  angular.module('myApp')
    .controller('aboutController', aboutController);

  function aboutController($scope, $http, $window, $q, aboutService) {

    var vm = this;

    vm.data = aboutService.preparedData;

    return vm;
  }
})();