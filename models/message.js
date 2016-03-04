/**
 *
 * Created by samirmarin on 2016-02-27.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var messageSchema = new Schema({
  id:           String,
  threadId:     String,
  from:         {type: Schema.Types.ObjectId, ref: 'Contact'},
  timestamp:    String,
  subject:      String,
  snippet:      String
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;