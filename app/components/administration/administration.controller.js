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
    vm.tabs = [
      {
        title: 'Заявки',
        templateUrl: 'app/components/administration/views/requests.administration.view.html'
      }, {
        title: 'Главная',
        templateUrl: 'app/components/administration/views/main.administration.view.html'
      }, {
        title: 'О компании',
        templateUrl: 'app/components/administration/views/about.administration.view.html'
      }, {
        title: 'Статьи',
        templateUrl: 'app/components/administration/views/articles.administration.view.html'
      }, {
        title: 'Прайс лист',
        templateUrl: 'app/components/administration/views/price.administration.view.html'
      }
    ];
    vm.selectedTab = vm.tabs[0];
    vm.selectedTab.active = true;
    vm.selectTab = function (tabItem) {
      vm.selectedTab.active = false;
      vm.selectedTab = tabItem
      vm.selectedTab.active = true;
    };
    vm.mainInfo = homeService.getInfo();
    vm.saveMainInfo = function (event) {
      var confirm = $mdDialog.confirm().title('Сохранить изменения?').targetEvent(event).ok('Сохранить').cancel('Отменить');
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
      var confirm = $mdDialog.confirm().title('Вы действительно хотите удалить?').textContent('Потом уже ничего не вернуть..').ariaLabel('Lucky day').targetEvent(event).ok('Удалить').cancel('Я еще подумаю');
      $mdDialog.show(confirm).then(function () {
        articleService.deletePost(postId);
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
    vm.saveAboutText = function () {
      var confirm = $mdDialog.confirm().title('Сохранить изменения?').textContent('Сохранение').ariaLabel('Lucky day').targetEvent(event).ok('Сохранить').cancel('Отменить');
      $mdDialog.show(confirm).then(function () {
        aboutService.saveAboutText(vm.aboutText);
      }, function () {});
    };
    vm.logOut = function () {
      var confirm = $mdDialog.confirm().title('Вы действительно хотите выйти?').textContent('выход из системы').ariaLabel('Lucky day').targetEvent(event).ok('Выйти').cancel('Остаться');
      $mdDialog.show(confirm).then(function () {
        $rootScope.logout();
      }, function () {});
    };

    priceService.getDataAsync().then(function (data) {
      vm.priceGroups = _.groupBy(data, function (item) {
        return item.workTypeId
      });

      for (var groupId in vm.priceGroups) {
        var id = parseInt(groupId);

        vm.priceGroups[groupId].title = ''
        var workType = workTypesService.getTypeById(id).then(function (data) {
          if (data && data.length > 0) {
            vm.priceGroups[groupId].title = data[0].titleText;
          }
        });
      }
    });

    vm.editPriceItemDialog = function (event, priceItem) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
      $mdDialog.show({
        templateUrl: 'app/components/administration/views/priceitem.administration.modal.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: false,
        fullscreen: useFullScreen,
        controller: 'editPriceItemController as ctrl',
        locals: {
          priceItem: priceItem
        }
      }).then(function (answer) {}, function () {});
    }

    return vm;
  };
})();