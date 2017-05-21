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
    jwt.verify(req.body.token, 'secret', function(err, decoded){
      console.log('decoded is: ', decoded);
      authorId = decoded.user[0]._id;
      title = req.body.newblog.title;
      content = req.body.newblog.content;
      username = decoded.user[0].username;
      console.log("req.body.newblog is: ", { authorId, title, content });
      newBlogPost = new Blog({ authorId, title, content });
      newBlogPost.save();
      User.findOneAndUpdate({ username: username}, {$push: {blogs: newBlogPost }})
        .then(response => {
          return res.send({ response });
        });
    });

  },
  findPerUser(req, res) {
    let author;
    jwt.verify(req.body.token, 'secret', function(err, decoded){
      console.log('decoded is: ', decoded);
      author = decoded.user[0].username;
      console.log('user that is saying hello is: ', decoded.user[0].username);
      console.log('author is: ', author);
      User.findOne({ username: author })
        .populate('blogs')
        .then(user => {
          console.log(user.blogs);
          res.send(user);
        });
    });

  }
};