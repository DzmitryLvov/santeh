(function () {
  'use strict';
  var serviceId = 'workTypesService';
  angular.module('myApp').factory(serviceId, ['_', '$q', 'galleryService', '$filter', '$firebaseArray', function workTypesService(_, $q, galleryService, $filter, $firebaseArray) {
    var self = this;

    self.data = []

    function getDataAsync() {
      return $firebaseArray(firebase
          .database().ref().child('WorkTypes'))
        .$loaded()
        .then(function (data) {
          self.data = data;
          return self.data;
        });
    }

    function getDataByCategoryId(id) {
      return getDataAsync().then(function (data) {
        return $filter('filter')(self.data, {
          categoryId: id
        }, true);
      });
    }

    function getTypeById(id) {
      return getDataAsync().then(function (data) {
        return $filter('filter')(self.data, {
          id: id
        }, true);
      });
    }

    return {
      getDataAsync: getDataAsync,
      getDataByCategoryId: getDataByCategoryId,
      getTypeById: getTypeById
    };
  }]);
})();