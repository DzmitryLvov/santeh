(function () {
  'use strict';

  angular.module('myApp').factory('requestService', [
    '$filter', '$firebaseArray', requestService]);

  function requestService($filter, $firebaseArray) {
    function getDataAsync() {
      return $firebaseArray(firebase.database().ref().child('Requests'))
        .$loaded()
        .then(function (data) {
          return data;
        })
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
        if (existingItemIndex >= 0) {
          data[existingItemIndex] = item;
          data.$remove(existingItemIndex);
        }
      });
    }

    return {
      getDataAsync: getDataAsync,
      saveItem: saveItem,
      deleteItem: deleteItem
    }
  }
})();