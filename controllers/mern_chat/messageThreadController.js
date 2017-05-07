const MessageThread = require('../../models/mern_chat/messageThread');


module.exports = {
  create(req, res) {
    console.log('req.body is: ', req.body);
    const newMessageThread = new MessageThread(req.body);
    newMessageThread.save().then(newThread => {
      console.log("New messageThread created!", newThread);
      res.send(newThread);
    });
  }
};