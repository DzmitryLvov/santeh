(function () {
  'use strict';
  var serviceId = 'galleryService';
  angular.module('myApp').factory(serviceId, ['$q', '$filter', '$firebaseArray', function galleryService($q, $filter, $firebaseArray) {
    var self = this;

    self.photoList = [];

    function getData() {
      var ref = firebase.database().ref().child('PhotoList');
      self.photoList = $firebaseArray(ref);

      return self.photoList;
    };

    function getDataAsync() {
      if (!self.photoList || !self.photoList.length) {
        return $firebaseArray(
            firebase.database().ref().child('PhotoList'))
          .$loaded()
          .then(function (data) {
            self.photoList = data;
            return self.photoList;
          })
      }
      else {
        var deffered = $q.defer();
        deffered.resolve(self.photoList)
        return deffered.promise;
      }
    }

    function getPhotoListByWorkTypeId(workTypeId) {
      return getDataAsync().then(function (data) {
        return $filter('filter')(self.photoList, {
          workTypeId: workTypeId
        }, true);
      });
    };

    function saveItem(item) {
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

    return {
      getData: getData,
      getDataAsync: getDataAsync,
      getPhotoListByWorkTypeId: getPhotoListByWorkTypeId,
      saveItem: saveItem,
      deleteItem: deleteItem
    };
  }]);
})();