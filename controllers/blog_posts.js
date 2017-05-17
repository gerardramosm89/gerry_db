const moment = require('moment');
const Blog = require('../models/blog_posts');

module.exports = {
  greeting(req, res) {
    res.send({ message: "Greeting from Blog API!" });
  },
  create(req, res) {
    console.log('req.body is: ', req.body);
    console.log(Math.floor(new Date() / 1000));
    console.log('moment is: ', moment().format('YYYY/MM/DD HH:mma'));
    let newBlog = new Blog({
      author: req.body.author,
      date: moment().format('YYYY/MM/DD HH:mma'),
      title: req.body.title,
      content: req.body.content
    });
    newBlog.save().then(user => {
      res.send(user);
      console.log(user, "was saved");
    });
  },
  findPerUser(req, res) {
    let author = req.body.author;
    Blog.find({ author }).then(posts => {
      console.log('posts is: ', posts);
      return res.send(posts);
    });
  }
};