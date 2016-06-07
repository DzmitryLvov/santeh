(function () {
  'use strict';

  angular.module('myApp')
    .controller('administrationController', administrationController);

  function administrationController(newsService, aboutService, homeService, priceService, requestService) {
    var vm = this;
    
    return vm;
  }
})();