(function () {
  'use strict';

  angular.module('myApp')
    .controller('galleryController', galleryController);

  function galleryController(galleryService) {
    var vm = this;

    vm.items = galleryService.photoList;

    $('.gallery-container').magnificPopup({
      delegate: 'a'
      , type: 'image'
      , gallery: {
        enabled: true
        , arrowMarkup: ''
        , tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
      }
    });

    return vm;
  }
})();