/**
 *
 * Created by samirmarin on 2016-02-27.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  userName: String,
  email: String,
  passWord: String,
});

var User = mongoose.model('User', userSchema);

module.exports = User;








