angular.module('myApp')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.when('', '/');

    $urlRouterProvider.otherwise('/404');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/home/views/home.view.html'
      })
      .state('404', {
        url: '/404',
        templateUrl: 'app/shared/404.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/components/login/views/login.view.html',
        controller: 'loginController',
        controllerAs: 'ctrl'
      })
      .state('price', {
        url: '/price',
        templateUrl: 'app/components/price/views/price.view.html',
        controller: 'priceController',
        controllerAs: 'ctrl'
      })
      .state('articles', {
        url: '/articles',
        templateUrl: 'app/components/post/views/articles.view.html',
        controller: 'articlesController',
        controllerAs: 'ctrl'
      })
      .state('post', {
        url: '/post/:urlText',
        templateUrl: 'app/components/post/views/post.view.html',
        controller: 'postController',
        controllerAs: 'ctrl'
      })
      .state('administration', {
        url: '/administration',
        templateUrl: 'app/components/administration/administration.view.html',
        controller: 'administrationController',
        controllerAs: 'ctrl',
        data: {
          authorization: true,
          redirectTo: 'login'
        }
      })
      .state('administration.price', {
        url: '/price',
        templateUrl: 'app/components/administration/priceitems/price.administration.view.html',
        controller: 'priceItemAdministrationController',
        controllerAs: 'ctrl',
        data: {
          authorization: true,
          redirectTo: 'login'
        }
      })
      .state('administration.works', {
        url: '/works',
        templateUrl: 'app/components/administration/worktypes/worktypes.administration.view.html',
        controller: 'worktypesAdministrationController',
        controllerAs: 'ctrl',
        data: {
          authorization: true,
          redirectTo: 'login'
        }
      })
      .state('administration.photo', {
        url: '/photos',
        templateUrl: 'app/components/administration/gallery/gallery.administration.view.html',
        controller: 'galleryAdministrationController',
        controllerAs: 'ctrl',
        data: {
          authorization: true,
          redirectTo: 'login'
        }
      })
      .state('administration.articles', {
        url: '/articles',
        templateUrl: 'app/components/administration/articles/articles.administration.view.html',
        controller: 'articlesAdministrationController',
        controllerAs: 'ctrl',
        data: {
          authorization: true,
          redirectTo: 'login'
        }
      })
      .state('administration.requests', {
        url: '/requests',
        templateUrl: 'app/components/administration/requests/requests.administration.view.html',
        controller: 'requestsAdministrationController',
        controllerAs: 'ctrl',
        data: {
          authorization: true,
          redirectTo: 'login'
        }
      })
      .state('feedback', {
        url: '/feedback',
        templateUrl: 'app/components/feedback/views/feedback.view.html',
        controller: 'feedbackController',
        controllerAs: 'ctrl'
      })
      .state('gallery', {
        url: '/gallery',
        templateUrl: 'app/components/gallery/views/gallery.view.html',
        controller: 'galleryController',
        controllerAs: 'ctrl'
      })
      .state('works', {
        url: '/works/{workTitle}',
        templateUrl: 'app/components/worktypes/views/worktypes.view.html',
        controller: 'workTypesController',
        controllerAs: 'ctrl'
      })
      .state('houseWorks', {
        url: '/house/{workTitle}',
        templateUrl: 'app/components/worktypes/views/house.worktypes.view.html',
        controller: 'workTypesHouseController',
        controllerAs: 'ctrl'
      });
}]);