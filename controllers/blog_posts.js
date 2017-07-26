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
      if (!decoded) {
        return res.send({ message: 'Token has expired, log in again' });
      }
      authorId = mongoose.Types.ObjectId(decoded.user[0]._id);
      console.log('decoded.user is: ', decoded.user);
      author = decoded.user;
      title = req.body.newblog.title;
      content = req.body.newblog.content;
      learningPath = req.body.learningPath;
      postOrder = req.body.postOrder;
      publish = req.body.publish;
      username = decoded.user;
      console.log('authorId is: ', authorId);
      console.log("req.body.newblog is: ", req.body.newblog);

      const postToBeInserted = req.body.newblog;
      postToBeInserted.authorId = authorId;
      postToBeInserted.author = author;
      console.log('postToBeInserted is: ', postToBeInserted);
      newBlogPost = new Blog(postToBeInserted);
      newBlogPost.save().then(savedPost => {
        User.findOneAndUpdate({ username: username}, {$push: {blogs: newBlogPost }})
        .then(response => {
          return res.status(201).send({ response });
        });
      });

    });

  },
  findPerUser(req, res) {
    let author;
    if (!req.body.token) {
      return res.send({ message: 'Token required' });
    }
    jwt.verify(req.body.token, 'secret', function(err, decoded){
      if (!decoded) {
        return res.send({ message: 'Token has expired' });
      }
      author = decoded.user;
      console.log('current author is: ', author);
      User.findOne({ username: author })
        // .populate('blogs')
        .populate({
          path: 'blogs',
          options: {
            sort: {'createdAt': -1}
          }
        })        
        .then(user => {
          res.send(user);
        });
    });
  },
  fetchOne(req, res) {
    // let author;
    // if (!req.body.token) {
    //   return res.send({ message: 'Token required' });
    // }
    // jwt.verify(req.body.token, 'secret', function(err, decoded) {
    // });
    // Blog.find({ _id: req.body.postId }).then(blog => {
    //   return res.send(blog);
    // });

    // No route protection for single gets
    Blog.find({ _id: req.body.postId }).then(blog => {
      return res.send(blog); 
    });
  },
  deleteOne(req, res) {
    const postId = req.body.postId;
    const decoded = '';
    jwt.verify(req.body.token, 'secret', function(err, decoded) {
      decoded = decoded;
      Blog.findOneAndRemove({ _id: postId })
      .then(() => {
        return Blog.findOne({ _id: postId }).then(post => {
          if (post == null) {
            User.update({ username: decoded.user }, { $pull: { blogs: postId}})
              .then(response => {
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
    Blog.findByIdAndUpdate(postId, updates)
      .then(updateResponse => {
        res.send(updateResponse);
      });
  },
  fetchAll(req, res) {
    Blog.find({}).then(posts => {
      res.send(posts);
    });
  },
  fetchByLearningPath(req, res) {
    var learningPath = req.body.learningPath;
    Blog.find({ 'learningPath.path': learningPath })
      .then(posts => {
        res.send(posts.sort(function compareNumbers(a,b) {
          let vara = a.learningPath.orderNum;
          let varb = b.learningPath.orderNum;
          if (vara < varb) return -1;
          if (vara > varb) return 1;
          return 0
        }));
      });
  }
};