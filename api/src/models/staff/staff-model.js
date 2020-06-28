'use strict';

const Model = require('../mongo.js');
const schema = require('./staff-schema.js');

class Staff extends Model {
  constructor() { super(schema); }
}

module.exports = Staff;
