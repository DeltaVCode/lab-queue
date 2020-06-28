'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const courses = mongoose.Schema({
  code: { type: String, required: true },
});

module.exports = mongoose.model('courses', courses);
