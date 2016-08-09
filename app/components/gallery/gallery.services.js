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

    function getDataAsync() {
      if (!self.photoList || !self.photoList.length) {
        return $firebaseArray(firebase
            .database().ref().child('PhotoList'))
          .$loaded()
          .then(function (data) {
            self.photoList = data;
            return self.photoList;
          })
      }
      else {
        return new Promise(function (resolve, reject) {
          resolve(self.photoList);
        })
      }
    }

    function getPhotoListByWorkTypeId(workTypeId) {
      if (workTypeId >= 0) {
        return getDataAsync().then(function (data) {
          return $filter('filter')(self.photoList, {
            workTypeId: workTypeId
          }, true);
        });
      }
    };

    return {
      getData: getData,
      getPhotoListByWorkTypeId: getPhotoListByWorkTypeId
    };
  }]);
})();