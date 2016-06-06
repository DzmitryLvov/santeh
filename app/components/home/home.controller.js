(function () {
    'use strict';

    angular.module('myApp')
        .controller('homeController', homeController);

    homeController.$inject = ["$scope", "$http", "$window", "$q"];

    function homeController($scope, $http, $window, $q) {

            var vm = this
            
            

            return vm;
       }
})();