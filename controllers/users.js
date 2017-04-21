const User = require('../models/user');

module.exports = {
  greeting(req, res) {
    res.send({ message: "Hello from users controller!" });
  },
  create(req, res) {
    console.log(req.body);
    const userProps = req.body;
    User.create(userProps)
      .then(user => {
        return res.send(user)
      });
    // res.send({ message: "You tried to create!"})
  }
}