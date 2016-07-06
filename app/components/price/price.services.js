(function () {
  'use strict';
  var serviceId = 'priceService';
  angular.module('myApp').factory(serviceId, ['$filter', '$firebaseArray', function priceService($filter, $firebaseArray) {
    var self = this;

    self.priceItems = [];

    function getData() {
      var ref = firebase.database().ref().child('PriceItems');
      self.priceItems = $firebaseArray(ref);

      return self.priceItems;
    };

    function getDataAsync() {
      return $firebaseArray(firebase.database().ref().child('PriceItems'))
        .$loaded()
        .then(function (data) {
          return data;
        })
    };

    function getPriceItemsByWorkTypeId(workTypeId) {
      if (workTypeId) {
        if (!self.priceItems || !self.priceItems.length) {
          getData();
        }

        var result = $filter('filter')(self.priceItems, {
          workTypeId: workTypeId
        }, true);
      }
      return result;
    };

    return {
      getDataAsync: getDataAsync,
      getData: getData,
      getPriceItemsByWorkTypeId: getPriceItemsByWorkTypeId
    }
  }]);
})();