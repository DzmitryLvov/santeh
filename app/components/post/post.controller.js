(function () {
  'use strict';
  angular.module('myApp').controller('postController', ['articleService', '$state', '$stateParams', postController]);

  function postController(articleService, $state, $stateParams) {
    var vm = this;
    var searchResult = articleService.getPost($stateParams.postId);
    if (searchResult && searchResult.length) {
      vm.post = searchResult[0];
    }
    else {
      $state.go('404');
    }
    return vm;
  }
})();