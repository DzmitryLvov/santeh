(function () {
  'use strict';
  angular.module('myApp').controller('galleryController', ['galleryService', galleryController]);

  function galleryController(galleryService) {
    var vm = this;

    galleryService.getDataAsync().then(function (data) {
      vm.items = data;
    });

    $('.gallery-container').magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery: {
        enabled: true,
        arrowMarkup: '',
        tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
      }
    });

    return vm;
  }
})();