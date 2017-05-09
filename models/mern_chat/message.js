const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  threadId: { type: Schema.Types.ObjectId, ref: 'messageThreads'},
  author: { type: Schema.Types.ObjectId, ref: 'user' },
  text: { type: String, required: true }
});

const Message = mongoose.model('messages', MessageSchema);

module.exports = { Message, MessageSchema};