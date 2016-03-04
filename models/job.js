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
  company: {type: Schema.Types.ObjectId, ref: 'Company'},
  messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
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

jobSchema.methods.setMessages = function(messages){
  //TODO:
  //this method is here so that when we have empty
  //messages we stay consitent with empty message array
  // message Id-- this may needed to be added to
  // modified when we start having non empty messages

    this.messages = this.messages;

};

jobSchema.plugin(deepPopulate, { whitelist: [ 'company'] });

var Job = mongoose.model('Job', jobSchema);

module.exports = Job;