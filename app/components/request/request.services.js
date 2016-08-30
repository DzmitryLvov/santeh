(function () {
  'use strict';

  angular.module('myApp').factory('requestService', ['ResourceService', requestService]);

  function requestService(ResourceService) {
    return new ResourceService('Requests');
  }
})();