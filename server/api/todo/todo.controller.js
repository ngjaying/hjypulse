/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/todos              ->  index
 * POST    /api/todos              ->  create
 * GET     /api/todos/:id          ->  show
 * PUT     /api/todos/:id          ->  update
 * DELETE  /api/todos/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import passport from 'passport';
import Todo from './todo.model';
import jwt from 'jsonwebtoken';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Todos
export function index(req, res) {
  var userId = req.user._id;
  return Todo.find({user: userId }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Todo from the DB
export function show(req, res) {
  return Todo.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Todo in the DB
export function create(req, res) {
  let todo = req.body;
  console.log(todo);
  todo.user = req.user._id;
  return Todo.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Todo in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Todo.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Todo from the DB
export function destroy(req, res) {
  return Todo.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
