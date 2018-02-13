const UsersCtrl = require('../controllers/users');
const BlogCtrl = require('../controllers/blog_posts');
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
  //   jwt.verify(req.body.token, 'secret', function(err, decoded){
  //     console.log('decoded is: ', decoded);
  //     console.log('user that is saying hello is: ', decoded.user[0].username);
  //     if (err) {
  //       return res.status(401).send({ message: 'Token is invalid', error: err });
  //     }
  //     next();
  //   });
  // });
  // End route protection

  // API Test Message
  app.post('/api', (req, res) => {
    res.send({ message: "Hello from the API!" });
  });
  
  // Users Routes
  app.post('/api/users', UsersCtrl.create);
  app.delete('/api/users', UsersCtrl.delete);
  app.post('/api/user/:id', UsersCtrl.getOne);
  app.put('/api/users', UsersCtrl.update);
  app.post('/api/verifytoken', UsersCtrl.verifyToken);
  app.post('/api/changepassword', UsersCtrl.changePassword);
  
  // Blog Routes
  app.post('/api/blogs/create', BlogCtrl.create);
  app.post('/api/queryblogs', BlogCtrl.findPerUser);
  app.post('/api/fetchone', BlogCtrl.fetchOne);
  app.post('/api/deleteOne', BlogCtrl.deleteOne);
  app.post('/api/updateOne', BlogCtrl.findOneandUpdate);
  app.post('/api/fetchall', BlogCtrl.fetchAll);
  app.post('/api/learningpath', BlogCtrl.fetchByLearningPath);
  app.post('/api/numbylearningpath', BlogCtrl.fetchAmountByLearningPath);
};