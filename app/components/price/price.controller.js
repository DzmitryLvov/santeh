(function () {
  'use strict';
  angular.module('myApp').controller('priceController', ['priceService', 'workTypesService', priceController]);

  function priceController(priceService, workTypesService) {
    var vm = this;

    priceService.getDataAsync().then(function (data) {
      vm.priceGroups = _.groupBy(data, function (item) {
        return item.workTypeId
      });

      for (var groupId in vm.priceGroups) {
        if (groupId == '-1') {
          vm.priceGroups[groupId].title = 'Прочие услуги';
        }
        else {
          workTypesService.getTypeById(groupId).then(function (data) {
            if (data && data.length > 0) {
              var workType = data[0];

              vm.priceGroups[workType.$id].title = workType.titleText;
              vm.priceGroups[workType.$id].notesText = workType.notesText;
            }
          })
        }
      }
    });

    return vm;
  }
})();