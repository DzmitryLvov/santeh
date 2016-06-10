(function () {
  'use strict';

  angular.module('myApp')
    .controller('administrationController', administrationController);

  function administrationController(newsService, aboutService, homeService, priceService, requestService, $mdDialog, $mdMedia) {
    var vm = this;

    console.log(newsService);

    vm.postList = newsService.preparedData;

    vm.editPostDialog = function (event, post) {
      console.log(post);
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

      $mdDialog.show({
          templateUrl: 'app/components/administration/views/newpost.administration.modal.html'
          , parent: angular.element(document.body)
          , targetEvent: event
          , clickOutsideToClose: false
          , fullscreen: useFullScreen
          , controller: 'editPostController as ctrl'
          , locals: {
            post: post
          }
        })
        .then(function (answer) {

        }, function () {

        });
    };

    vm.deletePost = function (event, postId) {
      var confirm = $mdDialog.confirm()
        .title('Вы действительно хотите удалить?')
        .textContent('Потом уже ничего не вернуть..')
        .ariaLabel('Lucky day')
        .targetEvent(event)
        .ok('Удалить')
        .cancel('Я еще подумаю');
      $mdDialog.show(confirm).then(function () {
        newsService.deletePost(postId);
      }, function () {});
    };

    return vm;
  }
})();