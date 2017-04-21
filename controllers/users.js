module.exports = {
  greeting(req, res) {
    res.send({ message: "Hello from users controller!" });
  },
  create(req, res) {
    console.log(req.body);
    res.send({ message: "You tried to create!"})
  }
}