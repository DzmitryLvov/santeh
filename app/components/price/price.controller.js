(function () {
  'use strict';

  angular.module('myApp')
    .controller('priceController', priceController);

  function priceController(priceService, workTypesService) {
    var vm = this;

    var priceItems = priceService.priceItems;

    vm.priceGroups = _.groupBy(priceItems, function (item) {
      return item.workTypeId
    });

    for (var groupId in vm.priceGroups) {
      var id = parseInt(groupId);
      var workType = workTypesService.getTypeById(id)[0];

      if (workType) {
        vm.priceGroups[groupId].title = workType.titleText;
        vm.priceGroups[groupId].notesText = workType.notesText;
      }
    }

    
    
    return vm;
  }
})();