(function () {
  'use strict'

  angular.module('myApp').factory('ResourceService', ['$firebaseArray', function ($firebaseArray) {
    var serviceBuilder = this;

    serviceBuilder.$firebaseArray = $firebaseArray;

    return function (repositoryName, enableCache) {
      var service = this;

      service.repositoryName = repositoryName;

      service.getDataAsync = function () {
        return serviceBuilder.$firebaseArray(firebase.database().ref().child(service.repositoryName))
          .$loaded()
          .then(function (data) {
            return data;
          })
      };

      service.saveItem = function (item) {
        return service.getDataAsync().then(function (data) {
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

      service.deleteItem = function (item) {
        return service.getDataAsync().then(function (data) {
          var existingItemIndex = data.$indexFor(item.$id);
          if (existingItemIndex >= 0) {
            data[existingItemIndex] = item;
            data.$remove(existingItemIndex);
          }
        });
      }

      return service;
    }
  }]);
}())