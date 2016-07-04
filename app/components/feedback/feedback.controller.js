(function () {
  'use strict';
  angular.module('myApp').controller('feedbackController', ['feedbackService', '$mdDialog', '$mdMedia', feedbackController])

  function feedbackController(feedbackService, $mdDialog, $mdMedia) {
    var vm = this;
    vm.feedbackList = feedbackService.feedbackList;
    vm.addFeedback = function (event) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
      $mdDialog.show({
        templateUrl: 'app/components/feedback/views/newfeedback.modal.html'
        , parent: angular.element(document.body)
        , targetEvent: event
        , clickOutsideToClose: true
        , fullscreen: useFullScreen
        , controller: function (feedbackService, $mdDialog) {
          var self = this;
          self.newFeedback = new Object();
          self.hide = function () {
            $mdDialog.hide();
          };
          self.cancel = function () {
            $mdDialog.cancel();
          };
          self.saveFeedback = function () {
            if (self.newFeedback) {
              feedbackService.saveFeedback(self.newFeedback);
            }
          };
          return self;
        }
      }).then(function (answer) {}, function () {});
    };
    return vm;
  };
})();