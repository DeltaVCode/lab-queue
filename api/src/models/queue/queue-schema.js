'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const queue = mongoose.Schema({
  issue: { type: String, required: true },
  student: { type: String },
  assignment: { type: String },
  location: { type: String },
  complete: { type: Boolean, default:false },
  course: { type: String, required:true },
});

module.exports = mongoose.model('queue', queue);
