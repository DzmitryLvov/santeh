(function () {
  'use strict';
  var serviceId = 'workTypesService';
  angular.module('myApp').factory(serviceId, ['_', 'galleryService', '$filter', '$firebaseArray', function workTypesService(_, galleryService, $filter, $firebaseArray) {
    var self = this;

    self.data = []

    function getDataAsync() {
      return $firebaseArray(firebase
          .database().ref().child('WorkTypes'))
        .$loaded()
        .then(function (data) {
          self.data = data;
          return self.data;
        })
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
      getTypeById: getTypeById
    };
  }]);
})();