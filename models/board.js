/**
 *
 * Created by samirmarin on 2016-02-27.
 */

var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;


var boardSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }]
});

boardSchema.plugin(deepPopulate, { whitelist: [ 'lists.jobs.company'] });
var Board = mongoose.model('Board', boardSchema);

module.exports = Board;