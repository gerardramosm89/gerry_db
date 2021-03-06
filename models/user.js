const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false,
    required: true
  },
  blogs: [{ type: Schema.Types.ObjectId, ref: 'blogs' }],
  messageThreads: [{ type: Schema.Types.ObjectId, ref: 'messageThreads' }],
}, { timestamps: true });

const User = mongoose.model('user', UserSchema);

module.exports = { User, UserSchema };