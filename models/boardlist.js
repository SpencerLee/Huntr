/**
 * Created by samirmarin on 2016-02-27.
 */

var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Schema = mongoose.Schema;

var listSchema = new Schema({
  name: String,
  iconName: String,
  board: {type: Schema.Types.ObjectId, ref: 'Board'},
  jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }]
});

listSchema.plugin(deepPopulate, { whitelist: [ 'jobs'] });

var List = mongoose.model('List', listSchema);

module.exports = List;
