const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  // author: {
  //   type: String,
  //   required: true
  // },
  author: { type: Schema.Types.ObjectId, ref: 'user' },
  date: {
    type: String,
    // required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const Blog = mongoose.model('blogs', BlogSchema);

module.exports = Blog;