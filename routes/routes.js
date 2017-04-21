const UsersCtrl = require('../controllers/users');

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.send({ message: "Hello from the API!" });
  })

  app.get('/api/users', UsersCtrl.greeting);
  app.post('/api/userauth', UsersCtrl.find);
  app.post('/api/users', UsersCtrl.create);
  app.delete('/api/users', UsersCtrl.delete);
};