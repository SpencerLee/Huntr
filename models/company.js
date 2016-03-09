/**
 *
 * Created by samirmarin on 2016-02-27.
 */


var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var companySchema = new Schema({
  name: String,
  logoUrl: String,
  hexColor: String,
  glassdoorId: { type:String, required: true, unique: true },
  glassdoorKey: String,
  location: String,
  industry: String,
  numberOfRatings: String,
  overallRating: String,
  website: String,  
});

var Company = mongoose.model('Company', companySchema);

module.exports = Company