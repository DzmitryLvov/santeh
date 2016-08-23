(function () {
  'use strict';
  angular.module('myApp')
    .controller('priceItemAdministrationController', [
      'priceService',
      'workTypesService',
      '$mdDialog',
      '$mdMedia',
      priceItemAdministrationController])
    .controller('priceItemEditorController', [
      '$mdDialog',
      'priceService',
      'workTypesService',
      'priceItem',
      priceItemEditorController]);

function priceItemAdministrationController(priceService, workTypesService, $mdDialog, $mdMedia) {
  var vm = this;

  var loadPriceItems = function () {
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
            }
          })
        }
      }
    });
  }

  vm.editPriceItemDialog = function (event, priceItem) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

    vm.selectedPriceItem = priceItem;

    $mdDialog.show({
      templateUrl: 'app/components/administration/priceitems/priceitem.administration.modal.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: false,
      fullscreen: useFullScreen,
      controller: 'priceItemEditorController',
      controllerAs: 'ctrl',
      locals: {
        '$mdDialog': $mdDialog,
        'priceService': priceService,
        'workTypesService': workTypesService,
        'priceItem': vm.selectedPriceItem
      }
    }).then(function (answer) {
      loadPriceItems();
    }, function () {});
  }

  vm.deletePriceItem = function (event, item) {
    var confirm = $mdDialog
      .confirm()
      .title('Вы действительно хотите удалить?')
      .textContent('Удаление услуги')
      .ariaLabel('delete')
      .targetEvent(event)
      .ok('Удалить')
      .cancel('Отменить');

    $mdDialog.show(confirm).then(function () {
      priceService.deleteItem(item).then(function (response) {
        loadPriceItems();
      })
    }, function () {});
  }

  loadPriceItems();

  return vm;
}

function priceItemEditorController($mdDialog, priceService, workTypesService, priceItem) {
  var vm = this;

  vm.selectedPriceItem = priceItem;

  var loadWorkTypes = function () {
    workTypesService.getDataAsync().then(function (data) {
      vm.workTypes = data;
    });
  }

  vm.hide = function () {
    $mdDialog.hide();
  };

  vm.cancel = function () {
    $mdDialog.cancel();
  };

  vm.saveItem = function () {
    priceService.savePriceItem(vm.selectedPriceItem)
      .then(function (response) {
        $mdDialog.hide();
      });
  }

  loadWorkTypes();

  return vm;
}
})();