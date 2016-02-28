/**
 *
 * Created by samirmarin on 2016-02-27.
 */


var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var activitySchema = new Schema({
  title: String,
  type: String,
  description: String,
  date: Date,
  job: {type: Schema.Types.ObjectId, ref: 'Job'}
});

var Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;

