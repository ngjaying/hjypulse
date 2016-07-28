'use strict';

angular.
  module('todoList').
  component('todoList', {
    templateUrl: 'app/todo-list/todo-list.template.html',
    controller: ['Todo',
      function TodoListController(Todo) {
        this.todos = Todo.query();
        this.todo = {};
      }
    ]
  });