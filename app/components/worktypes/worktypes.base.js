(function () {
  angular.module('myApp').controller('WorkTypesBaseController', ['vm', 'workTypesService', 'priceService', 'galleryService', '$filter', WorkTypesBaseController]);

  function WorkTypesBaseController(vm, workTypesService, priceService, galleryService, $filter) {
    vm.workTypes = [];

    vm.getData = function (categoryId, selectedWorkTitle) {
      return workTypesService.getDataByCategoryId(categoryId)
        .then(function (snapshot) {
          vm.workTypes = snapshot;

          if (selectedWorkTitle) {
            var item = $filter('filter')(vm.workTypes, {
              urlText: selectedWorkTitle
            }, true)[0];
            if (item) {
              selectItem(item);
              populateRelatedData();
            }
          }
          else {
            selectItem(vm.workTypes[0]);
            populateRelatedData();
          }
        });
    }

    function selectItem(item) {
      if (item) {
        if (vm.selectedItem) {
          vm.selectedItem.active = false;
        }
        vm.selectedItem = item;
        vm.selectedItem.active = true;
      }
    }

    function populateRelatedData() {
      vm.selectedItem.priceItems = [];
      priceService.getPriceItemsByWorkTypeId(vm.selectedItem.id).then(function (data) {
        vm.selectedItem.priceItems = data;
      });

      vm.selectedItem.photos = [];
      galleryService.getPhotoListByWorkTypeId(vm.selectedItem.id).then(function (data) {
        vm.selectedItem.photos = data;
      });
    }

    vm.initMagnific = function () {
      $('.gallery-photos').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
          enabled: true,
          arrowMarkup: '',
          tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
        }
      });
    }
  }
}())