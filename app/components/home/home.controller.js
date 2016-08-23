(function () {
  'use strict';
  angular.module('myApp').controller('homeController', ['$scope', '$filter', 'homeService', 'workTypesService', 'galleryService', homeController]);

  function homeController($scope, $filter, homeService, workTypesService, galleryService) {
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

    loadWorkTypes();
    loadGallery();

    return vm;
  }
})();