const Blog = require('../models/blog_posts');

module.exports = {
  greeting(req, res) {
    res.send({ message: "Greeting from Blog API!" });
  },
  create(req, res) {
    console.log('req.body is: ', req.body);
    res.send(req.body);
  }
};