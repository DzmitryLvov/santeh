angular.module('myApp')
  .run(['_', '$rootScope', '$state', 'Authorization', function (_, $rootScope, $state, Authorization) {
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

    var config = {
      apiKey: "AIzaSyAebzYs_DR29-HYxS0T368XAwg2Tdrvyck",
      authDomain: "santex-e3078.firebaseapp.com",
      databaseURL: "https://santex-e3078.firebaseio.com",
      storageBucket: "santex-e3078.appspot.com"
    };
    firebase.initializeApp(config)
  }]);