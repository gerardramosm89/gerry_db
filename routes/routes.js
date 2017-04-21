const UsersCtrl = require('../controllers/users');
const BlogCtrl = require('../controllers/blog_posts');

module.exports = (app) => {
  // API Testing
  app.get('/api', (req, res) => {
    res.send({ message: "Hello from the API!" });
  })
  // Users Routes
  app.get('/api/users', UsersCtrl.greeting);
  app.post('/api/userauth', UsersCtrl.find);
  app.post('/api/users', UsersCtrl.create);
  app.delete('/api/users', UsersCtrl.delete);

  // Blog Routes
  app.get('/api/blogs', BlogCtrl.greeting);
  app.post('/api/blogs', BlogCtrl.create);
};