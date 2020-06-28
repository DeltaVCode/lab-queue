'use strict';

const Model = require('../mongo.js');
const schema = require('./courses-schema.js');

class Courses extends Model {
  constructor() { super(schema); }
}

module.exports = Courses;
