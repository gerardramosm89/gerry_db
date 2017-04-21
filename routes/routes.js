const UsersCtrl = require('../controllers/users');

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.send({ message: "Hello from the API!" });
  })

  app.get('/api/users', UsersCtrl.greeting);

  app.post('/api/users', UsersCtrl.create);
};