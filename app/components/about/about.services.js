(function () {
  'use strict';

  var serviceId = 'aboutService';

  angular.module('myApp').factory(serviceId, function aboutService($http) {

    var factory = {
      preparedData: [
        {
          name: 'Name text one'
        }
        , {
          name: 'Name text two'
        }
        ]
    };

    return factory;
  });
})();