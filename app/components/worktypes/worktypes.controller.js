(function () {
  'use strict';

  angular.module('myApp')
    .controller('workTypesController', workTypesController);

  function workTypesController(workTypesService) {
    var vm = this;

    vm.workTypes = workTypesService.getData();

    $('.gallery-photos').magnificPopup({
      delegate: 'a'
      , type: 'image'
      , gallery: {
        enabled: true
        , arrowMarkup: ''
        , tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
      }
    });

    vm.selectedItem = vm.workTypes[0];

    return vm;
  }
})();