(function () {
  'use strict';

  angular.module('myApp')
    .service('homeService', ['$firebaseObject', function homeService($firebaseObject) {
      var self = this;

      function getInfoAsync() {
        return $firebaseObject(firebase
            .database().ref().child('About'))
          .$loaded()
          .then(function (data) {
            self.data = data;
            return self.data;
          });
      }

      function saveInfo(info) {

      }

      return {
        getInfoAsync: getInfoAsync,
        saveInfo: saveInfo
      }
  }]);
})();