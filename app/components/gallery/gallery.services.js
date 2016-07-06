(function () {
  'use strict';
  var serviceId = 'galleryService';
  angular.module('myApp').factory(serviceId, ['$filter', '$firebaseArray', function galleryService($filter, $firebaseArray) {
    var self = this;

    self.photoList = [];

    function getData() {
      var ref = firebase.database().ref().child('PhotoList');
      self.photoList = $firebaseArray(ref);

      return self.photoList;
    };

    function getPhotoListByWorkTypeId(workTypeId) {
      if (workTypeId) {
        if (!self.photoList || self.photoList.length) {
          getData();
        }

        var result = $filter('filter')(self.photoList, {
          workTypeId: workTypeId
        }, true);
      }
      return result;
    };

    return {
      getData: getData,
      getPhotoListByWorkTypeId: getPhotoListByWorkTypeId
    };
  }]);
})();