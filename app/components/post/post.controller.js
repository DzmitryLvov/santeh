(function () {
  'use strict';
  angular.module('myApp').controller('postController', ['articleService', '$state', '$stateParams', postController]);

  function postController(articleService, $state, $stateParams) {
    var vm = this;

    articleService.getPost($stateParams.urlText).then(function (data) {
      if (data && data.length) {
        vm.post = data[0];
      }
      else {
        $state.go('404');
      }
    })

    return vm;
  }
})();