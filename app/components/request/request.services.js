(function () {
  'use strict';
  var serviceId = 'requestService';
  angular.module('myApp').factory(serviceId, ['$filter', function requestService($filter) {
    var self = this;
    self.requestList = [
      {
        id: 1
        , title: 'Заявка 1'
        , date: Date.today()
        , phone: '+375222242424'
        , email: 'email@mail.com'
        , text: 'Комментарии к заявке'
      }, {
        id: 2
        , title: 'Заявка 2'
        , date: Date.today()
        , phone: '+375222242424'
        , email: 'email@mail.com'
        , text: 'Комментарии к заявке'
      }, {
        id: 3
        , title: 'Заявка 3'
        , date: Date.today()
        , phone: '+375222242424'
        , email: 'email@mail.com'
        , text: 'Комментарии к заявке'
      }, {
        id: 4
        , title: 'Заявка 4'
        , date: Date.today()
        , phone: '+375222242424'
        , email: 'email@mail.com'
        , text: 'Комментарии к заявке'
      }
    ];

    function saveRequest(request) {
      if (request) {
        self.requestList.push(request);
      }
    };

    function deleteRequest(requestId) {};
    return {
      requestList: self.requestList
      , saveRequest: saveRequest
      , deleteRequest: deleteRequest
    }
  }]);
})();