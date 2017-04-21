const UsersCtrl = require('../controllers/users');

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.send({ message: "Hello there!" });
  })

  app.get('/api/users', UsersCtrl.greeting);
};