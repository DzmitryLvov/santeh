(function () {
  function DialogController($mdDialog) {
    var vm = this;

    vm.hide = function () {
      $mdDialog.hide();
    };

    vm.cancel = function () {
      $mdDialog.cancel();
    };
  };
}())
