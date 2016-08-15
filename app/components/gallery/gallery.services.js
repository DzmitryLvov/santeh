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

    return {
      getData: getData,
      getPhotoListByWorkTypeId: getPhotoListByWorkTypeId
    };
  }]);
})();