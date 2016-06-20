(function () {
  'use strict';

  angular.module('myApp')
    .controller('articlesController', articlesController)
    .directive('articlesPreview', articlesPreview);

  function articlesController(articleService) {
    var vm = this;

    vm.postList = articleService.preparedData;

    return vm;
  };

  function articlesPreview() {
    return {
      restrict: 'E'
      , templateUrl: 'app/components/post/views/articles-preview.view.html'
    };
  };
})();