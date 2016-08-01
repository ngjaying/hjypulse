'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema,
    ObjectId = Schema.ObjectId;
var TodoSchema = new _mongoose2.default.Schema({
  name: String,
  info: String,
  complete: Boolean,
  user: ObjectId
});

exports.default = _mongoose2.default.model('Todo', TodoSchema);
//# sourceMappingURL=todo.model.js.map
