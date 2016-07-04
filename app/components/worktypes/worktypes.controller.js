(function () {
  'use strict';
  angular.module('myApp').controller('workTypesController', ['workTypesService', '$state', '$stateParams', '$filter', workTypesController]).directive('svgImage', ['$http', svgImage]);

  function workTypesController(workTypesService, $state, $stateParams, $filter) {
    var vm = this;
    vm.workTypes = workTypesService.getData();
    vm.selectItem = function (item) {
      if (vm.selectedItem) {
        vm.selectedItem.active = false;
      }
      vm.selectedItem = item;
      vm.selectedItem.active = true;
    };
    if ($stateParams.workTitle) {
      var item = $filter('filter')(vm.workTypes, {
        urlText: $stateParams.workTitle
      }, true)[0];
      if (item) {
        vm.selectItem(item);
      }
    }
    else {
      vm.selectItem(vm.workTypes[0]);
    }
    $('.gallery-photos').magnificPopup({
      delegate: 'a'
      , type: 'image'
      , gallery: {
        enabled: true
        , arrowMarkup: ''
        , tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
      }
    });
    return vm;
  };

  function svgImage($http) {
    return {
      restrict: 'E'
      , link: function (scope, element) {
        var imgURL = element.attr('src');
        // if you want to use ng-include, then
        // instead of the above line write the bellow:
        // var imgURL = element.attr('ng-include');
        var request = $http.get(imgURL, {
          'Content-Type': 'application/xml'
        });
        scope.manipulateImgNode = function (data, elem) {
          var $svg = angular.element(data)[4];
          var imgClass = elem.attr('class');
          if (typeof (imgClass) !== 'undefined') {
            var classes = imgClass.split(' ');
            for (var i = 0; i < classes.length; ++i) {
              $svg.classList.add(classes[i]);
            }
          }
          $svg.removeAttribute('xmlns:a');
          return $svg;
        };
        request.success(function (data) {
          element.replaceWith(scope.manipulateImgNode(data, element));
        });
      }
    };
  };
})();