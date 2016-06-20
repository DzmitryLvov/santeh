/**
 * Load states for application
 * more info on UI-Router states can be found at
 * https://github.com/angular-ui/ui-router/wiki
 */
angular.module('myApp')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.when('', '/');

    $urlRouterProvider.otherwise('/404');

    $stateProvider
      .state('home', {
        url: '/'
        , templateUrl: 'app/components/home/views/home.view.html'
      })
      .state('404', {
        url: '/404'
        , templateUrl: 'app/shared/404.html'
      })
      .state('login', {
        url: '/login'
        , templateUrl: 'app/components/login/views/login.view.html'
        , controller: 'loginController'
        , controllerAs: 'ctrl'
      })
      .state('about', {
        url: '/about'
        , templateUrl: 'app/components/about/views/about.view.html'
        , controller: 'aboutController'
        , controllerAs: 'ctrl'
      })
      .state('price', {
        url: '/price'
        , templateUrl: 'app/components/price/views/price.view.html'
        , controller: 'priceController'
        , controllerAs: 'ctrl'
      })
      .state('articles', {
        url: '/articles'
        , templateUrl: 'app/components/post/views/articles.view.html'
        , controller: 'articlesController'
        , controllerAs: 'ctrl'
      })
      .state('post', {
        url: '/post/:postId'
        , templateUrl: 'app/components/post/views/post.view.html'
        , controller: 'postController'
        , controllerAs: 'ctrl'
      })
      .state('administration', {
        url: '/administration'
        , templateUrl: 'app/components/administration/views/administration.view.html'
        , controller: 'administrationController'
        , controllerAs: 'ctrl'
        , data: {
          authorization: true
          , redirectTo: 'login'
        }
      })
      .state('feedback', {
        url: '/feedback'
        , templateUrl: 'app/components/feedback/views/feedback.view.html'
        , controller: 'feedbackController'
        , controllerAs: 'ctrl'
      });
}]);