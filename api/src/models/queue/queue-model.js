'use strict';

const Model = require('../mongo.js');
const schema = require('./queue-schema.js');

/**
 * Class representing a To Do Item.
 * @extends Model
 */
class Queue extends Model {
  constructor() { super(schema); }
}

module.exports = Queue;
