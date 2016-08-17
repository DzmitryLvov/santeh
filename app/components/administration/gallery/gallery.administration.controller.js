(function () {
  'use strict';
  angular.module('myApp')
    .controller('galleryAdministrationController', [
      'galleryService',
      'workTypesService',
      '$mdDialog',
      '$mdMedia',
      galleryAdministrationController]);

  function galleryAdministrationController(galleryService, workTypesService, $mdDialog, $mdMedia) {
    var vm = this;

    var loadGallery = function () {
      galleryService.getDataAsync().then(function (data) {
        if (data) {
          vm.gallery = data;
        }
      })
    }

    vm.editPhotoDialog = function (event, photo) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

      $mdDialog.show({
        templateUrl: 'app/components/administration/gallery/photo.administration.modal.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: false,
        fullscreen: useFullScreen,
        controller: photoEditorController,
        controllerAs: 'ctrl',
        locals: {
          $mdDialog: $mdDialog,
          galleryService: galleryService,
          workTypesService: workTypesService,
          photoItem: photo
        }
      }).then(function (answer) {
        loadGallery();
      }, function () {});
    }

    vm.deletePhoto = function (event, item) {
      var confirm = $mdDialog
        .confirm()
        .title('Вы действительно хотите удалить?')
        .textContent('Удаление фото')
        .ariaLabel('delete')
        .targetEvent(event)
        .ok('Удалить')
        .cancel('Отменить');

      $mdDialog.show(confirm).then(function () {
        galleryService.deleteItem(item).then(function (response) {
          loadGallery();
        })
      }, function () {});
    }

    loadGallery();

    return vm;
  }

  function photoEditorController($mdDialog, galleryService, workTypesService, photoItem) {
    var vm = this;

    vm.photoItem = photoItem;

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
      galleryService.saveItem(vm.photoItem)
        .then(function (response) {
          $mdDialog.hide();
        });
    }

    vm.checkInageUrl = function (url) {
      var regexp = /(https?:\/\/.*\.(?:png|jpg))/i;
      return regexp.test(url);
    }

    loadWorkTypes();

    return vm;
  }
})();