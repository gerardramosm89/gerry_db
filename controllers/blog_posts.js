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
    res.send(req.body);

  }
};