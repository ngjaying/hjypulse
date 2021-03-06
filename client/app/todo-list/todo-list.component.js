'use strict';

angular.
  module('todoList').
  component('todoList', {
    templateUrl: 'app/todo-list/todo-list.template.html',
    controller: ['Todo',
      function TodoListController(Todo) {
        let self = this;
        self.todos = Todo.query();
        self.isCollapsed = [];
        for(let i in self.todos){
          self.isCollapsed[i] = false;
        }

        self.add = function($event) {
          if ((!$event || $event.which == 13) && self.todoInput) {
            Todo.save({
              name: self.todoInput,
              complete: false
            }, function(todo) {
              self.todos.push(todo);
              self.todoInput = '';
            });
          }
        };

        self.updateStatus = function(t) {
          Todo.update(t);
        };
      }
    ]
  });