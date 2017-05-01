const Companies = require('../models/companies');
const User = require('../models/user');

module.exports = {
  create(req, res) {
    console.log('req.body is: ', req.body);
    let companyProps = req.body;
    let newCompany = new Companies(companyProps);
    newCompany.save();
    res.send(companyProps);
  },
  findAll(req, res) {
    console.log(req.body);
    Companies.find({}).then(companies => {
      console.log(`The companies are ${companies}`);
      res.send({ companies: companies });
    });
  },
  getById(req, res) {
    Companies.find({ _id: req.params.id }).then(companies => {
      console.log(companies);
      res.send(companies);
    })
  },
  fetchUsersForCompany(req, res) {
    User.find({ companyId: req.params.id }).then(users => {
      console.log("Users found for fetchUsersCompany is: ", users);
      res.send(users);
    })
  }
};