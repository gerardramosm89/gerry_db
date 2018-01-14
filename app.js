const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes/routes');
const expressGraphQL = require('express-graphql');
const schema = require('./GraphQLSchemas/schema');
const keys = require('./config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/gerry_db');
// mongoose.createConnection('mongodb://localhost:27017/gerry_db');

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

app.post('/api/stripe', async (req, res) => {
  console.log('received api payment to backend');
  const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 Per Month',
      source: req.body.id
  });
  console.log('charge is: ', charge);
  res.send(charge);
});

routes(app);

module.exports = app;