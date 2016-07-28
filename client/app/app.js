'use strict';

angular.module('pulseApp', ['pulseApp.auth', 'pulseApp.admin', 'pulseApp.constants', 'ngCookies',
    'ngResource', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'validation.match', 'todoList'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
