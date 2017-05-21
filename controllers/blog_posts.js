const moment = require('moment');
const Blog = require('../models/blog_posts');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
    if (!req.body.token) {
      return res.send({ message: 'Token required' });
    }
    jwt.verify(req.body.token, 'secret', function(err, decoded){
      console.log('decoded is: ', decoded);
      if (!decoded) {
        return res.send({ message: 'Token has expired, log in again' });
      }
      console.log("decoded is: ", decoded);
      authorId = mongoose.Types.ObjectId(decoded.user[0]._id);
      title = req.body.newblog.title;
      content = req.body.newblog.content;
      username = decoded.user;
      console.log('authorId is: ', authorId);
      console.log("req.body.newblog is: ", { authorId, title, content });
      newBlogPost = new Blog({ authorId, title, content });
      newBlogPost.save().then(savedPost => console.log('savedPost is: ', savedPost));
      User.findOneAndUpdate({ username: username}, {$push: {blogs: newBlogPost }})
        .then(response => {
          return res.send({ response });
        });
    });

  },
  findPerUser(req, res) {
    let author;
    if (!req.body.token) {
      return res.send({ message: 'Token required' });
    }
    jwt.verify(req.body.token, 'secret', function(err, decoded){
      console.log('decoded is: ', decoded);
      if (!decoded) {
        return res.send({ message: 'Token has expired' });
      }
      author = decoded.user;
      console.log('author is: ', author);
      User.findOne({ username: author })
        .populate('blogs')
        .then(user => {
          console.log(user.blogs);
          res.send(user);
        });
    });
  },
  fetchOne(req, res) {
    let author;
    if (!req.body.token) {
      return res.send({ message: 'Token required' });
    }
    jwt.verify(req.body.token, 'secret', function(err, decoded) {
      console.log(decoded);
    });
    Blog.find({ _id: req.body.postId }).then(blog => {
      return res.send(blog);
    });
  }
};