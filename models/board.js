/**
 *
 * Created by samirmarin on 2016-02-27.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var boardSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});


var Board = mongoose.model('Board', boardSchema);

module.exports = Board;