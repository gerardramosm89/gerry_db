const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageThreadsSchema = new Schema({
  participants: {
    type: [],
    required: true
  },
  messageList: {
    type: []
  }
})

const MessageThreads = mongoose.model('messageThreads', messageThreadsSchema);

module.exports = MessageThreads;