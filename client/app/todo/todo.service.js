'use strict';

function todoService() {
	// AngularJS will instantiate a singleton by calling "new" on this function
}

angular.module('todoService', ['ngResource'])
  .factory('Todo', ['$resource',
    function($resource) {
      return $resource('/api/todos/:id', { id: '@_id' }, {
	    update: {
	      method: 'PUT'
	    }
      });
    }
  ]);