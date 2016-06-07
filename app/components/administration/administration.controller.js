(function () {
  'use strict';

  angular.module('myApp')
    .controller('administrationController', administrationController);

  function administrationController(newsService, aboutService, homeService, priceService, requestService, $mdDialog, $mdMedia) {
    var vm = this;

    vm.postList = newsService.getPostList();
    console.log(vm.postList);

    vm.openNewPostDialog = function (event) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
      
      $mdDialog.show({
          templateUrl: 'app/components/administration/views/newpost.administration.modal.html'
          , parent: angular.element(document.body)
          , targetEvent: event
          , clickOutsideToClose: false
          , fullscreen: useFullScreen
        })
        .then(function (answer) {
          console.log(answer);
        }, function () {
          
        });
    }

    return vm;
  }
})();