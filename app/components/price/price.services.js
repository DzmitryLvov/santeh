(function () {
  'use strict';

  var serviceId = 'priceService';

  angular.module('myApp').factory(serviceId, function priceService($http, $filter) {
    var self = this;

    self.priceItems = [{
      id: 1
      , workTypeId: 1
      , name: 'Название'
      , units: 'шт'
      , cost: '200'
    }, {
      id: 2
      , workTypeId: 1
      , name: 'Название'
      , units: 'шт'
      , cost: '200'
    }, {
      id: 3
      , workTypeId: 2
      , name: 'Название'
      , units: 'шт'
      , cost: '200'
    }, {
      id: 4
      , workTypeId: 2
      , name: 'Название'
      , units: 'шт'
      , cost: '200'
    }, {
      id: 5
      , workTypeId: 3
      , name: 'Название'
      , units: 'шт'
      , cost: '200'
    }, {
      id: 6
      , workTypeId: 4
      , name: 'Название'
      , units: 'шт'
      , cost: '200'
    }];

    function getPriceItemsByWorkTypeId(workTypeId) {
      if (workTypeId) {
        var result = $filter('filter')(self.priceItems, {
          workTypeId: workTypeId
        }, true);
      }

      return result;
    };

    return {
      priceItems: self.priceItems
      , getPriceItemsByWorkTypeId: getPriceItemsByWorkTypeId
    }
  });
})();