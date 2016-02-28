/**
 *
 * Created by samirmarin on 2016-02-27.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var citySchema = new Schema({
  name: String,
  country: String
});

var City = mongoose.model('City', citySchema);


module.exports = City;