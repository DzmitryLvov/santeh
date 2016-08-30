(function () {
  'use strict';
  var serviceId = 'workTypesService';
  angular.module('myApp').factory(serviceId, ['galleryService', '$filter', 'ResourceService', function workTypesService(galleryService, $filter, ResourceService) {
    var self = this;

    angular.extend(self, new ResourceService('WorkTypes'))
    
    self.getDataByCategoryId = function(id) {
      return self.getDataAsync().then(function (data) {
        return $filter('filter')(data, {
          categoryId: id
        }, true);
      });
    }

    self.getTypeById = function(id) {
      return self.getDataAsync().then(function (data) {
        return $filter('filter')(data, {
          $id: id
        }, true);
      });
    }

    return self;
  }]);
})();