const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes/routes');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/gerry_db');

app.use(cors());
app.use(bodyParser.json());

routes(app);

module.exports = app;