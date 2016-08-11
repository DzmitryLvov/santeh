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
          self.priceItems = data;
          return data;
        })
    };

    function getPriceItemsByWorkTypeId(workTypeId) {
      if (workTypeId > 0) {
        if (self.priceItems && self.priceItems.length > 0) {
          return new Promise(function (resolve, reject) {
            var searchResult = $filter('filter')(self.priceItems, {
              workTypeId: workTypeId
            }, true);

            if (searchResult && searchResult.length > 0) {
              resolve(searchResult);
            }
            else {
              reject('work type not found');
            }
          });
        }
        else {
          return getDataAsync().then(function (data) {
            var searchResult = $filter('filter')(self.priceItems, {
              workTypeId: workTypeId
            }, true);

            return searchResult;
          })
        }
      }
    };

    function savePriceItem(item) {
      return getDataAsync().then(function (data) {
        var existingItemIndex = data.$indexFor(item.$id);
        if (existingItemIndex < 0) {
          data.$add(item);
        }
        else {
          data[existingItemIndex] = item;
          data.$save(existingItemIndex);
        }
      });
    }
    
    function deleteItem(item){
      return getDataAsync().then(function (data) {
        var existingItemIndex = data.$indexFor(item.$id);
        if (existingItemIndex > 0) {
          data[existingItemIndex] = item;
          data.$remove(existingItemIndex);
        }
      });
    }

    return {
      getDataAsync: getDataAsync,
      getData: getData,
      getPriceItemsByWorkTypeId: getPriceItemsByWorkTypeId,
      savePriceItem: savePriceItem,
      deleteItem: deleteItem
    }
  }]);
})();