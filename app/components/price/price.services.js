(function () {
  'use strict';
  var serviceId = 'priceService';
  angular.module('myApp').factory(serviceId, ['$q', '$filter', '$firebaseArray', function priceService($q, $filter, $firebaseArray) {
    var self = this;

    self.priceItems = [];

    function getDataAsync() {
      return $firebaseArray(firebase.database().ref().child('PriceItems'))
        .$loaded()
        .then(function (data) {
          self.priceItems = data;
          return data;
        })
    };

    function getPriceItemsByWorkTypeId(workTypeId) {
      if (self.priceItems && self.priceItems.length > 0) {
        var deffered = $q.defer();

        var searchResult = $filter('filter')(self.priceItems, {
          workTypeId: workTypeId
        }, true);

        if (searchResult && searchResult.length > 0) {
          deffered.resolve(searchResult);
        }
        else {
          deffered.reject('work type not found');
        }

        return deffered.promise;
      }
      else {
        return getDataAsync().then(function (data) {
          var searchResult = $filter('filter')(self.priceItems, {
            workTypeId: workTypeId
          }, true);

          return searchResult;
        })
      }
    };

    function savePriceItem(item) {
      return getDataAsync().then(function (data) {
        if (!item.$id) {
          data.$add(item);
        }
        else {
          var existingItemIndex = data.$indexFor(item.$id);
          if (existingItemIndex < 0) {
            data.$add(item);
          }
          else {
            data[existingItemIndex] = item;
            data.$save(existingItemIndex);
          }
        }
      });
    }

    function deleteItem(item) {
      return getDataAsync().then(function (data) {
        var existingItemIndex = data.$indexFor(item.$id);
        if (existingItemIndex > 0) {
          data[existingItemIndex] = item;
          data.$remove(existingItemIndex);
        }
      });
    }
    
    function swapItems(leftItem, rightItem){
      return getDataAsync().then(function(data){
        var currentLeftItem = data.$getRecord(leftItem.$id);
        copyRecordData(rightItem, currentLeftItem);
        
        var currentRightItem = data.$getRecord(rightItem.$id);
        copyRecordData(leftItem, currentRightItem);
        
        data.$save(currentLeftItem);
        data.$save(currentRightItem);
      })
    }

    var copyRecordData = function(itemFrom, itemTo){
       itemTo.name = itemFrom.name;
        itemTo.units = itemFrom.units;
        itemTo.cost = itemFrom.cost;
        itemTo.workTypeId = itemFrom.workTypeId;
    }
    
    return {
      getDataAsync: getDataAsync,
      getPriceItemsByWorkTypeId: getPriceItemsByWorkTypeId,
      savePriceItem: savePriceItem,
      deleteItem: deleteItem,
      swapItems: swapItems
    }
  }]);
})();