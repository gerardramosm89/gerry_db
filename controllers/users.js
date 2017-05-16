const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

module.exports = {
  greeting(req, res) {
    res.send({ message: "Hello from users controller!" });
  },
  getAll(req, res) {
    User.find({}).then(users => {
      return res.status(200).send({ user: users });
    })
  },
  getOne(req, res) {
    const userProps = req.body;
    console.log(req.params);
    User.findOne({ _id: req.params.id }).then(user => {
      return res.send(user);
    });
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
          newUser.save().then((user) => {
            console.log("** New User Created: ", userProps);
            var token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 });
            res.send({ message: 'User Created!', user: user, token: token });
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
              if (response !== true) return res.send({ message: "Wrong password", token: null });
              else {
                var token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 });
                return res.status(200).send({ message: "Password is right!", token: token });
              }
            }).catch((err) => console.log(err));
        } else {
          return res.send({ message: 'User not found', token: null });
        }
      });
  },
  delete(req, res) {
    User.find({ username: req.body.username }).then((user) => {
      let foundUser = user[0];
      if (user.length > 0) {
        let plainTextPass = req.body.password;
        bcrypt.compare(plainTextPass, user[0].password)
          .then((response) => {
            if (response !== true) { 
              return res.send({ message: "Wrong password" });
            } else {
              User.findByIdAndRemove(foundUser._id).then((response) => {
                console.log(response);
                return res.send({ message: "User was deleted", deletedUser: response });
              }).catch((err) => console.log(err));
            }
          }).catch((err) => console.log(err));
      } else {
        res.send({ message: "User not found" });
      }
    }).catch((err) => res.send({ message: "No user to delete" }));
  },
  update(req, res) {
    console.log("req.body is: ", req.body);
      User.findOne({ username: req.body.username }).then(user => {
        console.log("User is: ", user);
        if (user === null) {
          res.send({ message: "User not found" });
        } else {
        User.update({ username: req.body.username }, req.body)
          .then((updateresp) => {
            console.log("Update response is: ", updateresp);
            User.findOne({ username: req.body.username})
              .then(user => res.send(user));
          });
        }
      });

  }
}