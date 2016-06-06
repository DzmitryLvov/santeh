(function () {
  'use strict';

  angular.module('myApp')
    .controller('newsController', newsController);

  function newsController(newsService) {
    var vm = this;
    
    vm.postList = newsService.getPostList();
    
    return vm;
  }
})();