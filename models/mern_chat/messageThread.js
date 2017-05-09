const mongoose = require('mongoose');
const { User, UserSchema } = require('../user');
const { Message, MessageSchema} = require('./message');
const Schema = mongoose.Schema;


const messageThreadsSchema = new Schema({
  name: { type: String },
  participants: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  messageList: [{ type: Schema.Types.ObjectId, ref: 'messages' }]
})

const MessageThreads = mongoose.model('messageThreads', messageThreadsSchema);

module.exports = MessageThreads;