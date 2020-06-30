'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const queue = mongoose.Schema({
  description: { type: String, required: true },
  student: { type: String, required: true },
  assignment_type: { type: String, required: true },
  assignment_number: { type: String },
  location: { type: String, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'in-progress', 'complete'] },
  course: { type: String, required: true },
  assignedTo: { type: String, required: false },
  createTime: { type: Date },
  completeTime: { type: Date },
  assignedTime: { type: Date },
});

module.exports = mongoose.model('queue', queue);
