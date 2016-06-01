(function () {
    'use strict';

    angular.module('myApp')
        .controller('homeController', homeController);

    homeController.$inject = ["$scope", "$http", "$window", "$q", "categoriesService"];

    function homeController($scope, $http, $window, $q, categoriesService) {

            var vm = this
            
            

            return vm;
       }
})();