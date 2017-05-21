const UsersCtrl = require('../controllers/users');
const BlogCtrl = require('../controllers/blog_posts');
const CompaniesCtrl = require('../controllers/companies');
const MessageThreadCtrl = require('../controllers/mern_chat/messageThreadController');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
  // API Testing

  // Unprotected routes

  // User authentication
  app.post('/api/userauth', UsersCtrl.find);
  
  // Protecting all API calls, user needs to be logged in to view everything below this
  // app.use('/', (req, res, next) => {
  //   console.log('req.query is: ', req.query);
  //   console.log('req.body is: ', req.body);
  //   console.log("hit the jwt check, req.body.token is: ", req.body.token);
    // jwt.verify(req.body.token, 'secret', function(err, decoded){
    //   console.log('decoded is: ', decoded);
    //   console.log('user that is saying hello is: ', decoded.user[0].username);
    //   if (err) {
    //     return res.status(401).send({ message: 'Token is invalid', error: err });
    //   }
    //   next();
    // });
  // });
  // End route protection

  // API Test Message
  app.post('/api', (req, res) => {
    res.send({ message: "Hello from the API!" });
  });

  // MessageThread Routes
  app.post('/api/messagethread', MessageThreadCtrl.create);
  app.post('/api/addmessage', MessageThreadCtrl.addMessage);
  
  // Users Routes
  // app.get('/api/users', UsersCtrl.greeting); need to take this out

  app.post('/api/users', UsersCtrl.create);
  app.delete('/api/users', UsersCtrl.delete);
  // app.get('/api/allusers', UsersCtrl.getAll); Should be no reason for this
  app.post('/api/user/:id', UsersCtrl.getOne);
  app.put('/api/users', UsersCtrl.update);

  // Companies Routes
  app.post('/api/companies', CompaniesCtrl.create);
  app.get('/api/companies', CompaniesCtrl.findAll);
  app.get('/api/companies/:id',CompaniesCtrl.getById);
  app.get('/api/companies/:id/users', CompaniesCtrl.fetchUsersForCompany);
  
  // Blog Routes
  // app.get('/api/blogs', BlogCtrl.greeting);
  app.post('/api/blogs/create', BlogCtrl.create);
  app.post('/api/queryblogs', BlogCtrl.findPerUser);
};