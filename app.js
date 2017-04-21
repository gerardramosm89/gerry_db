const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/routes');

app.use(bodyParser.json());

routes(app);
module.exports = app;