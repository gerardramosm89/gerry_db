const moment = require('moment');
const Blog = require('../models/blog_posts');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

module.exports = {
  greeting(req, res) {
    res.send({ message: "Greeting from Blog API!" });
  },
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
        // .populate('blogs')
        .populate({
          path: 'blogs',
          options: {
            // limit: 5,
            sort: {'createdAt': -1}
          }
        })        
        .then(user => {
          console.log(user.blogs + '\n');
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
  },
  deleteOne(req, res) {
    const postId = req.body.postId;
    const decoded = '';
    jwt.verify(req.body.token, 'secret', function(err, decoded) {
      decoded = decoded;
      console.log(decoded);
      console.log('User is: ', decoded.user);
      Blog.findOneAndRemove({ _id: postId })
      .then(() => {
        return Blog.findOne({ _id: postId }).then(post => {
          console.log('post after finding one is: ', post);
          if (post == null) {
            User.update({ username: decoded.user }, { $pull: { blogs: postId}})
              .then(response => {
                console.log('response from user update is: ', response);
              });
            res.send({ message: 'message removed!'});
          } else {
            res.send({ message: 'Message still in database, delete unsuccessful'});
          }
        });
      });
    });
  },
  findOneandUpdate(req, res) {
    const postId = req.body.postId;
    const updates = req.body.updates;
    console.log('postId we are updating is: ', postId);
    console.log('Updates we are pushing are: ', updates);

    Blog.findByIdAndUpdate(postId, updates)
      .then(updateResponse => {
        console.log('updateResponse is: ', updateResponse);
        res.send(updateResponse);
      });
  }
};