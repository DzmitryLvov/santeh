(function () {
  'use strict';

  angular.module('myApp')
    .controller('editPostController', editPostController);

  function editPostController(newsService, $mdDialog, $mdMedia, post) {
    var vm = this;

    vm.post = post;

    vm.hide = function () {
      $mdDialog.hide();
    };

    vm.cancel = function () {
      $mdDialog.cancel();
    };

    vm.savePost = function () {
      newsService.savePost(vm.post)

      $mdDialog.cancel();
    }

    return vm;
  }
})();