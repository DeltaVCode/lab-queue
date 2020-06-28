'use strict';

const Model = require('../mongo.js');
const schema = require('./queue-schema.js');

class Queue extends Model {
  constructor() { super(schema); }
}

module.exports = Queue;
