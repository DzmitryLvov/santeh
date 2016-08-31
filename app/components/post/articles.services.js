(function () {
  'use strict';

  angular.module('myApp').factory('articleService', [
    'ResourceService',
    '$q',
    '$filter',
    '$firebaseArray',
    function articleService(ResourceService, $q, $filter, $firebaseArray) {
      var self = this;

      angular.extend(self, new ResourceService('Articles'));

      self.getPost = function (urlText) {
        return self.getDataAsync().then(function (data) {
          return $filter('filter')(data, {
            urlText: urlText
          }, true);
        });
      };

      self.saveItem = function (item) {
        return self.getDataAsync().then(function (data) {
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

      var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      };

      return self;
  }]);
})();