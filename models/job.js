/**
 *
 * Created by samirmarin on 2016-02-27.
 */


var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Schema = mongoose.Schema;

var jobSchema = new Schema({
  jobTitle: String,
  cities: [String],
  list: {type: Schema.Types.ObjectId, ref: 'List'},
  company: {type: Schema.Types.ObjectId, ref: 'Company'}
});

// Make sure to remove job from list when deleting
jobSchema.pre('remove', function(next){
    this.model('List').update(
        {_id: this.list}, 
        {$pull: {jobs: this._id}}, 
        {multi: true},
        next
    );
});

jobSchema.plugin(deepPopulate, { whitelist: [ 'company'] });

var Job = mongoose.model('Job', jobSchema);

module.exports = Job;