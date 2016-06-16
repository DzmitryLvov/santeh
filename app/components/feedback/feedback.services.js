(function () {
  'use strict'

  angular.module('myApp').factory('feedbackService', function () {
    var self = this;

    self.feedbackList = [
      {
        id: 1
        , date: Date.today()
        , name: 'Имя'
        , rating: 5
        , text: 'feedbackText'
      }
    ]

    function saveFeedback(item) {
      if (item) {

      }
    }

    return {
      saveFeedback: saveFeedback
      , feedbackList: self.feedbackList
    };
  });
}())