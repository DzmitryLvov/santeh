(function () {
  'use strict';
  var serviceId = 'galleryService';
  angular.module('myApp').factory(serviceId, ['$filter', function galleryService($filter) {
    var self = this;
    self.photoList = [
      {
        id: 1
        , src: 'http://c2.staticflickr.com/8/7075/27000238684_176bdcbaf3_z.jpg'
        , workTypeId: 1
      }, {
        id: 2
        , src: 'http://farm8.staticflickr.com/7356/27493830330_6ef36efec6_z_d.jpg'
        , workTypeId: 1
      }, {
        id: 3
        , src: 'http://farm8.staticflickr.com/7292/27164796054_d221ce930c_z_d.jpg'
        , workTypeId: 2
      }, {
        id: 4
        , src: 'http://farm8.staticflickr.com/7127/27165422823_be01cc858f_z_d.jpg'
        , workTypeId: 3
      }, {
        id: 5
        , src: 'http://c2.staticflickr.com/8/7075/27000238684_176bdcbaf3_z.jpg'
        , workTypeId: 1
      }];

    function getPhotoListByWorkTypeId(workTypeId) {
      if (workTypeId) {
        var result = $filter('filter')(self.photoList, {
          workTypeId: workTypeId
        }, true);
      }
      return result;
    };
    return {
      getPhotoListByWorkTypeId: getPhotoListByWorkTypeId
      , photoList: self.photoList
    };
  }]);
})();