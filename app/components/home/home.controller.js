(function () {
  'use strict';
  angular.module('myApp').controller('homeController', ['$filter', 'homeService', 'workTypesService', homeController]);

  function homeController($filter, homeService, workTypesService) {
    var vm = this

    homeService.getInfoAsync().then(function(data){
      vm.info = data;
    });

    vm.workTypes = [];
    vm.baseWorkTypes = [];
    vm.houseWorkTypes = [];

    var loadWorkTypes = function () {
      workTypesService.getDataAsync().then(function (data) {
        vm.workTypes = data;

        vm.baseWorkTypes = $filter('filter')(data, {
          categoryId: 1
        }, true);

        vm.houseWorkTypes = $filter('filter')(data, {
          categoryId: 2
        }, true);
      })
    }

    loadWorkTypes();

    return vm;
  }
})();