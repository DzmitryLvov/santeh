(function () {
  'use strict';
  var serviceId = 'priceService';
  angular.module('myApp').factory(serviceId, ['ResourceService', '$q', '$filter', function priceService(ResourceService, $q, $filter, $firebaseArray) {
    var self = this;

    angular.extend(self, new ResourceService('PriceItems'));

    self.getPriceItemsByWorkTypeId = function (workTypeId) {
      return self.getDataAsync().then(function (data) {
        var searchResult = $filter('filter')(data, {
          workTypeId: workTypeId
        }, true);

        return searchResult;
      })
    };

    self.swapItems = function (leftItem, rightItem) {
      return self.getDataAsync().then(function (data) {
        var currentLeftItem = data.$getRecord(leftItem.$id);
        copyRecordData(rightItem, currentLeftItem);

        var currentRightItem = data.$getRecord(rightItem.$id);
        copyRecordData(leftItem, currentRightItem);

        data.$save(currentLeftItem);
        data.$save(currentRightItem);
      })
    }

    var copyRecordData = function (itemFrom, itemTo) {
      itemTo.name = itemFrom.name;
      itemTo.units = itemFrom.units;
      itemTo.cost = itemFrom.cost;
      itemTo.workTypeId = itemFrom.workTypeId;
    }

    return self;
  }]);
})();