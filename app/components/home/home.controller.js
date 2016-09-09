(function () {
  'use strict';
  angular.module('myApp').controller('homeController', [
    '$scope',
    '$filter',
    '$mdDialog',
    'homeService',
    'workTypesService',
    'galleryService',
    'requestService',
    'notificationService',
    homeController]);

  function homeController(
    $scope,
    $filter,
    $mdDialog,
    homeService,
    workTypesService,
    galleryService,
    requestService,
    notificationService) {
    var vm = this

    homeService.getInfoAsync().then(function (data) {
      vm.info = data;
    });

    vm.workTypes = [];
    vm.baseWorkTypes = [];
    vm.houseWorkTypes = [];
    vm.gallery = [];

    var loadWorkTypes = function () {
      workTypesService.getDataAsync().then(function (data) {
        vm.workTypes = data;

        vm.workTypes.forEach(function (element, index, array) {
          element.thumbText = element.thumbText.replace('-', '<span class="visible-xs"> </span>')
        })

        vm.baseWorkTypes = $filter('filter')(data, {
          categoryId: 1
        }, true);

        vm.houseWorkTypes = $filter('filter')(data, {
          categoryId: 2
        }, true);
      })
    }

    var loadGallery = function () {
      galleryService.getDataAsync().then(function (data) {
        vm.gallery = data;

        $('.main-gallery').magnificPopup({
          delegate: 'a',
          type: 'image',
          gallery: {
            enabled: true,
            arrowMarkup: '',
            tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
          }
        });
      });
    }

    vm.showRequestDialog = function (event) {
      var confirm = $mdDialog.prompt()
        .title('Оставьте нам номер и мы Вам перезвоним')
        .placeholder('Номер телефона')
        .ariaLabel('Номер телефона')
        .ok('Готово!')
        .cancel('Закрыть');
      $mdDialog.show(confirm).then(function (result) {
        var date = Date.today().toLocaleDateString("ru", {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        });
        
        var request = {
          phone: result,
          date: date,
        }
        
        requestService.saveItem(request).then(function (response) {
          notificationService.pushAll(request);

          $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Спасибо!')
            .textContent('Мы перезвоним Вам в ближайшее время.')
            .ariaLabel('Хорошо')
            .ok('Закрыть')
          );
        })
      }, function () {});
    }

    loadWorkTypes();
    loadGallery();

    return vm;
  }
})();