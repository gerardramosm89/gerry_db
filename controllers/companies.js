const Companies = require('../models/companies');

module.exports = {
  create(req, res) {
    console.log('req.body is: ', req.body);
    let companyProps = req.body;
    let newCompany = new Company(companyProps);
    newCompany.save();
    res.send(companyProps);
  },
  findAll(req, res) {
    console.log(req.body);
  }
};