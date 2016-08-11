/**
 * Load modules for application
 */

angular
  .module('myApp', ['ui.router', 'textAngular', 'ngMaterial', 'underscore', 'firebase'])
  .config(['$mdIconProvider', function ($mdIconProvider) {
    $mdIconProvider.fontSet('md', 'material-icons');
  }])
  .constant('CONFIG', {
    DebugMode: true,
    StepCounter: 0,
    APIHost: 'http://localhost:12017'
  });