const moment = require('moment');
const Blog = require('../models/blog_posts');
const { User } = require('../models/user');
const mongoose = require('mongoose');

module.exports = {
  greeting(req, res) {
    res.send({ message: "Greeting from Blog API!" });
  },
  // create(req, res) {
  //   console.log(Math.floor(new Date() / 1000));
  //   console.log('moment is: ', moment().format('YYYY/MM/DD HH:mma'));
  //   let newBlog = new Blog({
  //     author: mongoose.Types.ObjectId(`${req.body.authorId}`),
  //     date: moment().format('YYYY/MM/DD HH:mma'),
  //     title: req.body.title,
  //     content: req.body.content
  //   });
  //   newBlog.save().then(user => {
  //     res.send(user);
  //     console.log(user, "was saved");
  //   });
  // },
  create(req, res) {
    console.log("req.body.newblog is: ", req.body.newblog);
    newBlogPost = new Blog(req.body.newblog);
    newBlogPost.save();
    User.findOneAndUpdate({ username: req.body.username}, {$push: {blogs: newBlogPost }})
      .then(response => {
        return res.send({ response });
      });
  },
  findPerUser(req, res) {
    let author = req.body.username;
    User.findOne({ username: req.body.username })
      .populate('blogs')
      .then(user => {
        console.log(user.blogs);
        res.send(user);
      });
  }
};