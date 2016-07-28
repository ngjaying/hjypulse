'use strict';

angular.
  module('todoList').
  component('todoList', {
    templateUrl: 'app/todo-list/todo-list.template.html',
    controller: [
      function TodoListController() {
        this.todos = [];
      }
    ]
  });