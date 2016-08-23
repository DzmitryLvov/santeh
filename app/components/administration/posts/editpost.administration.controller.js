(function () {
  'use strict';
  angular.module('myApp').controller('editPostController', ['articleService', '$mdDialog', '$mdMedia', 'post', function (articleService, $mdDialog, $mdMedia, post) {
    var vm = this;
    vm.post = post;
    vm.hide = function () {
      $mdDialog.hide();
    };
    vm.cancel = function () {
      $mdDialog.cancel();
    };
    vm.savePost = function () {
      articleService.savePost(vm.post)
      $mdDialog.cancel();
    }
    return vm;
  }]);
})();