(function () {
  'use strict';
  angular.module('myApp').controller('articlesController', ['articleService', articlesController]).directive('articlesPreview', articlesPreview);

  function articlesController(articleService) {
    var vm = this;
    vm.postList = articleService.getArticles();
    return vm;
  };

  function articlesPreview() {
    return {
      restrict: 'E'
      , templateUrl: 'app/components/post/views/articles-preview.view.html'
    };
  };
})();