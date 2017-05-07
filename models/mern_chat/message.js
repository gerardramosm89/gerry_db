const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  threadId: {
    type: String
  },
  text: {
    type: String
  }
});

const Message = mongoose.model('messages', MessageSchema);

module.exports = Message;