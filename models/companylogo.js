/**
 * Created by samirmarin on 2016-03-03.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var companyLogoSchema = new Schema({
  img: {data: Buffer, contentType: String}
});

var CompanyLogo = mongoose.model('CompanyLogo', companyLogoSchema);

module.exports = CompanyLogo;