(function () {
  'use strict';

  angular.module('myApp')
    .controller('articlesAdministrationController', [
      'articleService',
      '$mdDialog',
      '$mdMedia',
      articlesAdministrationController])
  .controller('editPostController', [
      'articleService',
      '$mdDialog',
      'post',
      editPostController
    ]);

  function articlesAdministrationController(articleService, $mdDialog, $mdMedia) {
    var vm = this;

    var loadPostList = function () {
      articleService.getDataAsync().then(function (data) {
        vm.postList = data;
      })
    }

    vm.editPostDialog = function (event, post) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

      $mdDialog.show({
        templateUrl: 'app/components/administration/articles/newpost.administration.modal.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: false,
        fullscreen: useFullScreen,
        controller: 'editPostController',
        controllerAs: 'ctrl',
        locals: {
          '$mdDialog': articleService,
          '$mdDialog': $mdDialog,
          'post': post
        }
      }).then(function (answer) {
        loadPostList();
      }, function () {});
    }

    vm.deletePost = function (event, item) {
      var confirm = $mdDialog
        .confirm()
        .title('Вы действительно хотите удалить?')
        .textContent('Удаление статьи')
        .ariaLabel('delete')
        .targetEvent(event)
        .ok('Удалить')
        .cancel('Отменить');

      $mdDialog.show(confirm).then(function () {
        articleService.deleteItem(item).then(function (response) {
          loadPostList();
        })
      }, function () {});
    }

    loadPostList();
    return vm;
  }

  function editPostController(articleService, $mdDialog, post) {
    var vm = this;

    vm.post = post;

    vm.hide = function () {
      $mdDialog.hide();
    };

    vm.cancel = function () {
      $mdDialog.cancel();
    };

    vm.savePost = function () {
      articleService.saveItem(vm.post)
      $mdDialog.hide();
    }

    return vm;
  }
})();