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

/**
 * Used to add, remove, or reorder jobs
 * note we don't add the one to indextwo here
 * because they are no longer int when they leave
 * the client.
 * @param job jobId to add -- if none give null
 * @param jobRmv jobId to remove -- if non give null
 * @param indexOne index where item is being moved from
 * @param indexTwo index where item is being moved to
 * @param indexThree index where item is being moved to plus 1
 */
listSchema.methods.setJobs = function(job, jobRmv, indexOne, indexTwo, indexThree){
  if(job){
    var tempJobId = mongoose.Types.ObjectId(job);
    this.jobs.splice(indexTwo,0,tempJobId);
  }
  else if(jobRmv){
    this.jobs.splice(indexOne,1);
  }
  else{
    var tempJobId = this.jobs[indexOne];
    if(indexOne > indexTwo){
      this.jobs.splice(indexOne, 1);
      this.jobs.splice(indexTwo, 0, tempJobId);
    }
    else{
      this.jobs.splice(indexThree, 0, tempJobId);
      this.jobs.splice(indexOne, 1);
    }
  }
};

listSchema.plugin(deepPopulate, { whitelist: [ 'jobs'] });

var List = mongoose.model('List', listSchema);

module.exports = List;
