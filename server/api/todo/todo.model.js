'use strict';

import mongoose from 'mongoose';

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var TodoSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  user: ObjectId
});

export default mongoose.model('Todo', TodoSchema);
