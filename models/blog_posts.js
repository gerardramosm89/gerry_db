const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  // author: {
  //   type: String,
  //   required: true
  // },
  authorId: { type: Schema.Types.ObjectId, ref: 'user' , required: true},
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
}, { timestamps: true});

const Blog = mongoose.model('blogs', BlogSchema);

module.exports = Blog;