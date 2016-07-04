(function () {
  'use strict'
  angular.module('myApp').factory('Authorization', ['$state', function ($state) {
    var self = this;

    function authorized() {
      return localStorage.authorizationToken === "password"
    }

    function clear() {
      localStorage.authorizationToken = null;
    };

    function go(fallback) {
      localStorage.authorizationToken = "password";
      $state.go(fallback);
    };
    return {
      authorized: authorized
      , clear: clear
      , go: go
    };
  }]);
}())