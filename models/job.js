/**
 *
 * Created by samirmarin on 2016-02-27.
 */


var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var jobSchema = new Schema({
  jobTitle: String,
  cities: [String],
  list: {type: Schema.Types.ObjectId, ref: 'List'},
  company: {type: Schema.Types.ObjectId, ref: 'Company'}
});

var Job = mongoose.model('Job', jobSchema);

module.exports = Job;