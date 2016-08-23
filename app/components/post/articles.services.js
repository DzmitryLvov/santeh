(function () {
  'use strict';

  var serviceId = 'articleService';

  angular.module('myApp').factory(serviceId, ['$q', '$filter', '$firebaseArray', function articleService($q, $filter, $firebaseArray) {
    var self = this;

    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    };

    self.preparedData = [];

    function getDataAsync() {
      if (!self.photoList || !self.photoList.length) {
        return $firebaseArray(
            firebase.database().ref().child('Articles'))
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

    function getPost(urlText) {
      return getDataAsync().then(function (data) {
        return $filter('filter')(self.photoList, {
          urlText: urlText
        }, true);
      });
    };

    function saveItem(item) {
      return getDataAsync().then(function (data) {
        if (!item.$id) {
          item.date = Date.today().toLocaleDateString("ru", options);
          data.$add(item);
        }
        else {
          var existingItemIndex = data.$indexFor(item.$id);
          if (existingItemIndex < 0) {
            item.date = Date.today().toLocaleDateString("ru", options);
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

    function formatDate(element, index, array) {
      element.formattedDate = element.date.toLocaleDateString("ru", options);
      return true;
    };

    return {
      getDataAsync: getDataAsync,
      getPost: getPost,
      saveItem: saveItem,
      deleteItem: deleteItem
    }
  }]);
})();