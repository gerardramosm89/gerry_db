const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes/routes');
const expressGraphQL = require('express-graphql');
const schema = require('./GraphQLSchemas/schema');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/gerry_db');
// mongoose.createConnection('mongodb://localhost:27017/gerry_db');

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

routes(app);

module.exports = app;