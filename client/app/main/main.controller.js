'use strict';

(function() {

  class MainController {

    constructor($http) {
      this.$http = $http;
    }

    $onInit() {
      
    }
  }

  angular.module('pulseApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
