'use strict';

angular.module('pulseApp.auth', ['pulseApp.constants', 'pulseApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
