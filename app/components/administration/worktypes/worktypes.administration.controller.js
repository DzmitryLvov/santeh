(function () {
  angular.module('myApp').controller('worktypesAdministrationController', ['$filter', '$mdMedia', '$mdDialog', 'workTypesService', worktypesAdministrationController]);

  function worktypesAdministrationController($filter, $mdMedia, $mdDialog, workTypesService) {
    var vm = this;

    vm.workTypes = [];
    vm.baseWorkTypes = [];

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

    vm.editWorkTypeDialog = function (event, item) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

      $mdDialog.show({
        templateUrl: 'app/components/administration/worktypes/worktype.administration.modal.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: false,
        fullscreen: useFullScreen,
        controller: workTypeEditorController,
        controllerAs: 'ctrl',
        locals: {
          $mdDialog: $mdDialog,
          workTypesService: workTypesService,
          workType: item
        }
      }).then(function (answer) {
        loadWorkTypes();
      }, function () {});
    }

    vm.deleteWorkType = function (event, item) {
      var confirm = $mdDialog
        .confirm()
        .title('Вы действительно хотите удалить?')
        .textContent('Удаление услуги')
        .ariaLabel('delete')
        .targetEvent(event)
        .ok('Удалить')
        .cancel('Отменить');

      $mdDialog.show(confirm).then(function () {
        workTypesService.deleteItem(item).then(function (response) {
          loadWorkTypes();
        })
      }, function () {});
    }

    loadWorkTypes();
    return vm;
  }

  function workTypeEditorController($mdDialog, workTypesService, workType) {
    var vm = this;

    vm.selectedWorkType = workType;

    vm.saveItem = function () {
      workTypesService.saveItem(vm.selectedWorkType).then(function (response) {
        $mdDialog.hide();
      })
    }

    vm.hide = function () {
      $mdDialog.hide();
    };

    vm.cancel = function () {
      $mdDialog.cancel();
    };

    return vm;
  }
}())