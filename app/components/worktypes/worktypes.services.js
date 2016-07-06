(function () {
  'use strict';
  var serviceId = 'workTypesService';
  angular.module('myApp').factory(serviceId, ['_', 'priceService', 'galleryService', '$filter', '$firebaseArray', function workTypesService(_, priceService, galleryService, $filter, $firebaseArray) {
    var self = this;

    self.data = []

    function getData() {
      if (!self.data || !self.data.length) {
        var ref = firebase.database().ref().child('WorkTypes');
        self.data = $firebaseArray(ref);
      }

      _.map(self.data, function (item) {
        if (item) {
          if (item.id) {
            item.priceItems = priceService.getPriceItemsByWorkTypeId(item.id);
            item.photos = galleryService.getPhotoListByWorkTypeId(item.id);
          }
        }
      });

      return self.data;
    };

    function getDataAsync() {
      return $firebaseArray(firebase
          .database().ref().child('WorkTypes'))
        .$loaded()
        .then(function (data) {
          _.map(data, function (item) {
            if (item) {
              if (item.id) {
                item.priceItems = priceService.getPriceItemsByWorkTypeId(item.id);
                item.photos = galleryService.getPhotoListByWorkTypeId(item.id);
              }
            }
          });

          self.data = data;
          return self.data;
        })
    }

    function getTypeById(id) {
      if (id) {
        if (!self.data || !self.data.length) {
          getData();
        }

        var result = $filter('filter')(self.data, {
          id: id
        }, true);
      }

      return result;
    };

    return {
      getDataAsync: getDataAsync,
      getData: getData,
      getTypeById: getTypeById
    };
  }]);
})();