const MessageThread = require('../../models/mern_chat/messageThread');
const { User } = require('../../models/user');

module.exports = {
  create(req, res) {
    let gerry;
    console.log('req.body is: ', req.body.users);
    User.find({ username: req.body.users[0].username })
      .then(participant => {
        console.log("participant is: ", participant.toObject());
        gerry = participant.toObject();
        let messageThread = new MessageThread({
          name: "Message3",
          participants: [],
          messagesList: []
        });
        // let gerry = new User({ username: "Gerry", password: "Password", email: "gramos@support.cuda.com", admin: true });
        // console.log("Creating a new user is: ", gerry);
        // gerry.save();
        messageThread.participants.push(gerry);
        User.findOne({ username: 'csawtelle' }).then(user => {
          user.toObject();
          messageThread.participants.push(user.toObject());
        });
        console.log("messageThread.participants is: ", messageThread.participants);
        messageThread.save().then(response => {
          console.log("response from save is: " + response);
          // MessageThread.findOne({ _id: response._id })
          //   .populate({
          //     path: 'participants',
          //     model: 'user'
          //   })
          //   .then(user => {
          //     console.log("final user is: ", user.participants);
          //     res.send({ message: "Received!", users: user.participants });
          //   });
          MessageThread.findOne({ _id: response._id })
            .populate({
              path: 'participants',
              model: 'user'
            })
            .exec(function(err, participants) {
              console.log("WENT IN BOY***");
              if (err) console.log(err);
              console.log("final participants is: ", participants);
              res.send({ data: participants });
            });
        });
        
      });

  },
  addMessage(req, res) {
    console.log("req.body is: ", req.body);
    MessageThread.findOne( { _id: req.body._id })
      .then(messageThread => {
        console.log("Found message thread is: ", messageThread);
        messageThread.messageList.push({ author: req.body.message.author, text: req.body.message.text });
        console.log("Pushed message thread is: ", messageThread.messageList);
        messageThread.save().then(saved => console.log("Saved is: ", saved));
        res.send({message: "received!" });
      });
  }
};