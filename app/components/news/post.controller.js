(function () {
  'use strict';

  angular.module('myApp')
    .controller('postController', postController);

  function postController(newsService, $stateParams) {
    var vm = this;
      
    var searchResult = newsService.getPost($stateParams.postId);

    if(searchResult.length){
      vm.post = searchResult[0];
    }
    
    return vm;
  }
})();