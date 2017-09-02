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
    console.log('a user is signing in');
    userProps = req.body;
    console.log('userProps is: ', userProps);
    User.find({ username: userProps.username})
      .then(user => {
        console.log('user found: ', user);
        if (user.length > 0){
          let plainTextPass = req.body.password;
          console.log('plaintext pass is: ', plainTextPass);
          bcrypt.compare(plainTextPass, user[0].password)
            .then((response) => {
              console.log('response from bcrypt is: ', response);
              if (response !== true) return res.send({ message: "Wrong password", token: null });
              else {
                var token = jwt.sign({ user: user[0].username, _id: user[0]._id }, 'secret', { expiresIn: 720000 });
                console.log('password is correct!');
                return res.status(200).send({ message: "Password is right!", token: token, user: user[0].username });
              }
            }).catch((err) => console.log(err));
        } else {
          console.log('could not find user');
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
  },
  verifyToken(req, res) {
    console.log('---------');
    console.log('currently verifying token');
      let token = req.body.token;
      if (!token) return console.log('no token to verify, need to sign in');
      jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
          console.log('verifying token ran into an error: ', err);
          return res.send({ message: "Token is nowinvalid, can't refresh", token: null });
        }
        else {
          let newToken = jwt.sign({ user: decoded.user }, 'secret', { expiresIn: '2d' });
          console.log('successfully verified, new token is: ', newToken);
          res.send({ message: 'Token was refreshed', token: newToken})
        }
      });
  },
  async changePassword(req, gres) {
    console.log(`req.body is: ${JSON.stringify(req.body)}`)
    if (req.body.token === undefined) {
      return console.log('token is undefined, cannot change password');
    }
    jwt.verify(req.body.token, 'secret', (err, decoded) => {
      console.log('decoded is: ', decoded);
      User.find({ username: decoded.user })
        .then((res) => {
          bcrypt.compare(req.body.currentPassword, res[0].password)
            .then((res) => {
              if (res === true) {
                console.log(`${decoded.user} is changing their password.... Okay passwords match, let\'s change the password`);
                bcrypt.hash(req.body.newPassword, saltRounds)
                .then((hash) => {
                  console.log(`hash is: ${hash}`);
                  User.findOneAndUpdate({ username: decoded.user }, { password: hash }).then(res => {
                    console.log(`res from password update was ${res}`);
                    gres.send({ passwordChangeResponse: 'success' });      
                  });
                });
              } else {
                console.log(`${decoded.user} is trying to change their password but the password is not matching the one in the database`);
                gres.send({ passwordChangeResponse: 'failed' });
              }
            });
        });
    });


  }
}