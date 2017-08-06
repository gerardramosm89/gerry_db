const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  authorId: { type: Schema.Types.ObjectId, ref: 'user' , required: true},
  author: { type: String, required: true },
  title: { type: String, required: true },
  subheading: { type: String, required: true },
  content: { type: String, required: true },
  learningPath: { 
    orderNum: { type: Number, required: true },
    path: { type: String, required: true }
  },
  difficulty: { type: String, required: true },
  publish: { type: Boolean, required: true, default: false },
  titleImageName: { type: String, require: true }
}, { timestamps: true});

const Blog = mongoose.model('blogs', BlogSchema);

module.exports = Blog;