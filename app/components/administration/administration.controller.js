(function () {
  'use strict';

  angular.module('myApp')
    .controller('administrationController', administrationController);

  function administrationController(newsService, aboutService, homeService, priceService, requestService, $mdDialog, $mdMedia) {
    var vm = this;

    vm.mainInfo = homeService.getInfo();

    vm.saveMainInfo = function (event) {
      var confirm = $mdDialog.confirm()
        .title('Сохранить изменения?')
        .targetEvent(event)
        .ok('Сохранить')
        .cancel('Отменить');
      $mdDialog.show(confirm).then(function () {
        homeService.saveInfo(vm.mainInfo);
      }, function () {});
    };

    vm.postList = newsService.preparedData;

    vm.editPostDialog = function (event, post) {
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

    vm.priceList = priceService.cardItems;

    vm.savePriceItem = function (item) {
      if (item) {
        priceService.saveItem(item);
      }
    };

    vm.requestList = requestService.requestList;

    vm.deleteRequest = requestService.deleteRequest;

    return vm;
  }
})();