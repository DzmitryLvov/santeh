angular.module('myApp')
  .run(function (_, $rootScope, $state, Authorization) {
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      if (!Authorization.authorized()) {
        if (Authorization.memorizedState && (!_.has(fromState, 'data.redirectTo') || toState.name !== fromState.data.redirectTo)) {
          Authorization.clear();
        }
        if (_.has(toState, 'data') && _.has(toState.data, 'authorization') && _.has(toState.data, 'redirectTo')) {
          if (_.has(toState.data, 'memory') && toState.data.memory) {
            Authorization.memorizedState = toState.name;
          }
          $state.go(toState.data.redirectTo);
        }
      }
    });

    $rootScope.logout = function () {
      Authorization.clear();
      $state.go('home');
    };
  });