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
  glassdoorId: Number,
  glassdoorKey: String,
  location: String
});

var Company = mongoose.model('Company', companySchema);

module.exports = Company 