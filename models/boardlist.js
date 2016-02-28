/**
 * Created by samirmarin on 2016-02-27.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var listSchema = new Schema({
  name: String,
  iconName: String,
  board: {type: Schema.Types.ObjectId, ref: 'Board'}
});

var List = mongoose.model('List', listSchema);

module.exports = List;
