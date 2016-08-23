(function () {
  'use strict';
  angular.module('myApp').controller('articlesController', ['articleService', articlesController]);

  function articlesController(articleService) {
    var vm = this;

    articleService.getDataAsync().then(function (data) {
      vm.postList = data;
    })

    return vm;
  };
})();