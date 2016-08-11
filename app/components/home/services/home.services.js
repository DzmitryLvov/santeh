(function () {
  'use strict';

  angular.module('myApp')
    .service('homeService', [function homeService() {
    var self = this;

    function getInfo() {
      return {
        phone: '+7(123)456-78-90'
        , address: 'Москва, Цветной бульвар д.11 стр.6, офис 406'
        , schedule: 'Пн-Вс с 9:00 до 21:00'
      }
    }

    function saveInfo(info) {

    }

    return {
      getInfo: getInfo
      , saveInfo: saveInfo
    }
  }]);
})();