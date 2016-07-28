'use strict';

describe('Todo', function() {
  var $httpBackend;
  var Todo;
  var todosData = [
    {_id: 1, name: 'Todo X'},
    {_id: 2, name: 'Todo Y'},
    {_id: 3, name: 'Todo Z'}
  ];

  // Load the module that contains the `Phone` service before each test
  beforeEach(module('todoService'));

  // Instantiate the service and "train" `$httpBackend` before each test
  beforeEach(inject(function(_$httpBackend_, _Todo_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', '/api/todos').respond(todosData);
    $httpBackend.when('POST', '/api/todos').respond(function(method, url, data){
      var todo = angular.fromJson(data);
      todosData.push(todo);
      return [200, todo];
    });
    $httpBackend.when('PUT', /^\/api\/todos\/\d+$/).respond(function(method, url, data) {
      var todo = angular.fromJson(data);
      for (var i = 0, l = todosData.length; i < l; i++) {
        if (todosData[i].id === todo.id) {
          todosData[i] = todo;
          break;
        }
      }
      return [200, todo];
    });

    Todo = _Todo_;
  }));

  // Verify that there are no outstanding expectations or requests after each test
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the todos data from `/todos`', function() {
    var todos = Todo.query();
    $httpBackend.flush();
    expect(todos.length).to.equal(3);
  });

  it('should create the todo data ', function() {
    var todo = Todo.save({name: 'Todo A'});

    $httpBackend.flush();
    expect(todo.name).to.equal('Todo A');
  });

  it('should update the todos data', function() {
    var todos = Todo.query();

    $httpBackend.flush();
    var todo1 = todos[0];
    expect(todo1.name).to.equal('Todo X');
    todo1.name = 'Todo XU';

    todo1.$update();
    $httpBackend.flush();
    todos = Todo.query();
    $httpBackend.flush();
    expect(todos[0].name).to.equal('Todo XU');
  });

});