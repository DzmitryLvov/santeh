(function () {
  'use strict';
  var serviceId = 'galleryService';
  angular.module('myApp').factory(serviceId, ['$filter', 'ResourceService', function galleryService($filter, ResourceService) {
    var self = this;

    angular.extend(self, new ResourceService('PhotoList'));

    self.getPhotoListByWorkTypeId = function (workTypeId) {
      return self.getDataAsync().then(function (data) {
        return $filter('filter')(data, {
          workTypeId: workTypeId
        }, true);
      });
    };

    return self;
  }]);
})();