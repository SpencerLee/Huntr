/**
 *
 * Created by samirmarin on 2016-02-27.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  id:       String,
  provider:     String,
  displayName:  String,
  givenName:    String,
  familyName:   String,
  middleName:   String,
  emails:       Array,
  userName:     String,
  photos:       Array,
  boards:       [{ type: Schema.Types.ObjectId, ref: 'Board' }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;








