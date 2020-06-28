'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const staff = mongoose.Schema({
  username: { type: String, unique: true },
});

module.exports = mongoose.model('staff', staff);
