(function () {
  'use strict';

  angular.module('myApp')
    .controller('newsController', newsController)
    .directive('newsPreview', newsPreview);

  function newsController(newsService) {
    var vm = this;

    vm.postList = newsService.preparedData;

    return vm;
  };

  function newsPreview() {
    return {
      restrict: 'E'
      , templateUrl: 'app/components/news/views/news-preview.view.html'
    };
  };
})();