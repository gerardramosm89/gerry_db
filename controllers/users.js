const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  greeting(req, res) {
    res.send({ message: "Hello from users controller!" });
  },
  create(req, res) {
    const userProps = req.body;
    User.findOne({ username: userProps.username})
    .then((user) => {
      if (user) {
        res.send({ message: 'User exists' });
      }
      else {
        bcrypt.hash(userProps.password, saltRounds)
        .then((hash) => {
          userProps.password = hash;
          const newUser = new User(userProps);
          newUser.save().then(() => {
            console.log("** New User Created: ", userProps);
            res.send({ message: 'User Created!' });
          })
        });
      }
    });
  },
  find(req, res) {
    userProps = req.body;
    User.find({ username: userProps.username})
      .then(user => {
        if (user.length > 0){
          let plainTextPass = req.body.password;
          bcrypt.compare(plainTextPass, user[0].password)
            .then((response) => {
              if (response !== true) return res.send({ message: "Wrong password" });
              else {
                return res.send({ message: "Password is right!" });
              }
            }).catch((err) => console.log(err));
        } else {
          return res.send({ message: 'User not found' });
        }
      });
  },
  delete(req, res) {
    User.find({ username: req.body.username }).then((user) => {
      let foundUser = user[0];
      if (user.length > 0) {
        User.findByIdAndRemove(foundUser._id).then((response) => {
          return res.send({ message: "User was deleted" });
        }).catch((err) => console.log(err));
      } else {
        res.send({ message: "User not found" });
      }
    }).catch((err) => res.send({ message: "No user to delete" }));
  }
}