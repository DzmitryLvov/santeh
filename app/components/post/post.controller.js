(function () {
  'use strict';

  angular.module('myApp')
    .controller('postController', postController);

  function postController(articleService, $stateParams) {
    var vm = this;

    var searchResult = articleService.getPost($stateParams.postId);

    if (searchResult.length) {
      vm.post = searchResult[0];
    }

    return vm;
  }
})();