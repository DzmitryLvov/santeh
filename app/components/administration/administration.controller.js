(function () {
  'use strict';
  angular.module('myApp').controller('administrationController', [
    'articleService',
    'homeService',
    'priceService',
    'requestService',
    'workTypesService',
    '$mdDialog',
    '$mdMedia',
    '$rootScope',
    administrationController]);

  function administrationController(articleService, homeService, priceService, requestService, workTypesService, $mdDialog, $mdMedia, $rootScope) {
    var vm = this;

    vm.mainInfo = homeService.getInfo();
    vm.saveMainInfo = function (event) {
      var confirm = $mdDialog
        .confirm()
        .title('Сохранить изменения?')
        .targetEvent(event)
        .ok('Сохранить')
        .cancel('Отменить');

      $mdDialog.show(confirm).then(function () {
        homeService.saveInfo(vm.mainInfo);
      }, function () {});
    };

    vm.postList = articleService.preparedData;
    vm.editPostDialog = function (event, post) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
      $mdDialog.show({
        templateUrl: 'app/components/administration/views/newpost.administration.modal.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: false,
        fullscreen: useFullScreen,
        controller: 'editPostController as ctrl',
        locals: {
          post: post
        }
      }).then(function (answer) {}, function () {});
    };

    vm.deletePost = function (event, postId) {
      var confirm = $mdDialog
        .confirm()
        .title('Вы действительно хотите удалить?')
        .textContent('Потом уже ничего не вернуть..')
        .ariaLabel('Lucky day')
        .targetEvent(event)
        .ok('Удалить')
        .cancel('Я еще подумаю');

      $mdDialog.show(confirm).then(function () {
        articleService.deletePost(postId);
      }, function () {});
    }
    vm.requestList = requestService.requestList;
    vm.deleteRequest = requestService.deleteRequest;
    vm.saveAboutText = function () {
      var confirm = $mdDialog
        .confirm()
        .title('Сохранить изменения?')
        .textContent('Сохранение')
        .ariaLabel('Lucky day')
        .targetEvent(event)
        .ok('Сохранить')
        .cancel('Отменить');

      $mdDialog.show(confirm).then(function () {
        aboutService.saveAboutText(vm.aboutText);
      }, function () {});
    };

    vm.logOut = function () {
      var confirm = $mdDialog
        .confirm()
        .title('Вы действительно хотите выйти?')
        .textContent('выход из системы')
        .ariaLabel('Lucky day')
        .targetEvent(event)
        .ok('Выйти').cancel('Остаться');

      $mdDialog.show(confirm).then(function () {
        $rootScope.logout();
      }, function () {});
    };

    return vm;
  };
})();