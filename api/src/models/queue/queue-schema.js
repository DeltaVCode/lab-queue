'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const queue = mongoose.Schema({
  description: { type: String, required: true },
  student: { type: String, required: true },
  assignment_type: { type: String, required: true },
  assignment_number: { type: String, required: true },
  location: { type: String, required: true },
  complete: { type: Boolean, default: false },
  course: { type: String, required: true },
  assignedTo: { type: String, required: false },
});

module.exports = mongoose.model('queue', queue);
