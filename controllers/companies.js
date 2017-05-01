const Companies = require('../models/companies');

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
  }
};