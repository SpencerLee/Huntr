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
  //jobs: [String]
});

/**
 * Used to add or remove job from jobs
 * @param job the job id that is to be added to the list
 * use null if non is to be added
 * @param jobRmv: the job id that is to be removed from the
 * job list
 */
listSchema.methods.setJobs = function(job, jobRmv){
  if(job){
    this.jobs.push([mongoose.Types.ObjectId(job)]);
  }
  if(jobRmv){
    var newJobs = [];
    this.jobs.forEach(function(jobId){
      if(jobId != jobRmv){
        newJobs.push(jobId);
      }
    });
    this.jobs = newJobs
  }
};

listSchema.plugin(deepPopulate, { whitelist: [ 'jobs'] });

var List = mongoose.model('List', listSchema);

module.exports = List;
