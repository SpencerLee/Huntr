/**
 *
 * Created by samirmarin on 2016-02-27.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contactSchema = new Schema({
  name:           String,
  email:     String,
});

var Contact = mongoose.model('Contact', messageSchema);

module.exports = Contact;