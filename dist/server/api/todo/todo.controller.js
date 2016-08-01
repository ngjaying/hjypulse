/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/todos              ->  index
 * POST    /api/todos              ->  create
 * GET     /api/todos/:id          ->  show
 * PUT     /api/todos/:id          ->  update
 * DELETE  /api/todos/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _todo = require('./todo.model');

var _todo2 = _interopRequireDefault(_todo);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    res.status(statusCode).json(err);
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _lodash2.default.merge(entity, updates);
    return updated.save().then(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Todos
function index(req, res) {
  var userId = req.user._id;
  return _todo2.default.find({ user: userId }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Todo from the DB
function show(req, res) {
  return _todo2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Todo in the DB
function create(req, res) {
  var todo = req.body;
  console.log(todo);
  todo.user = req.user._id;
  return _todo2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Todo in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _todo2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Todo from the DB
function destroy(req, res) {
  return _todo2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=todo.controller.js.map
