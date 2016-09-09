(function () {
  'use strict';

  angular.module('myApp').factory('notificationService', ['ResourceService', '$http', notificationService]);

  function notificationService(ResourceService, $http) {
    var self = this;

    angular.extend(self, new ResourceService('NotificationTokens'));

    self.pushAll = function (request) {
      self.getDataAsync().then(function (data) {
        for (var i = 0; i < data.length; i++) {
          $http({
            method: 'JSONP',
            url : 'https://api.simplepush.io/send/' + data[i].$value + '/Новая заявка/' + request.phone});
        }
      })
    }

    return self;
  }
})();