const UsersCtrl = require('../controllers/users');
const BlogCtrl = require('../controllers/blog_posts');
const CompaniesCtrl = require('../controllers/companies');
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
  app.get('/api/allusers', UsersCtrl.getAll);
  app.post('/api/user/:id', UsersCtrl.getOne);
  app.put('/api/users', UsersCtrl.update);

  // Companies Routes
  app.post('/api/companies', CompaniesCtrl.create);
  app.get('/api/companies', CompaniesCtrl.findAll);
  app.get('/api/companies/:id',CompaniesCtrl.getById);
  app.get('/api/companies/:id/users', CompaniesCtrl.fetchUsersForCompany);
  
  // Blog Routes
  app.get('/api/blogs', BlogCtrl.greeting);
  app.post('/api/blogs', BlogCtrl.create);
};