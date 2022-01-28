const mongoose = require('mongoose');
const express = require('express');
const app = express();
const categories = require('./routes/categories.js');
const subcategories = require('./routes/subcategories.js');
const cors = require("cors");
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const uuid = require('uuid');


mongoose.connect('mongodb://localhost/investor')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB....'));

var corsOptions = {
    origin:'http://localhost:3000',
  };
  
//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use('/categories', categories);

//routes

// app.post('/create-payment-intent', async(req, res) => {
//   const {paymentMethodType, currancy} = req.body;
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 5000,
//     currency: currancy,
//     payment_method_types:[paymentMethodType],

//   });
//   res.json({clientSecret: paymentIntent.client_secret});
// });

app.get('/', (req, res) => {
    res.json('Hello!! Welcom on Investor Portal...');
});

app.post('/payment', (req, res) => {

    const{product, token} = req.body;
    console.log('PRODUCT');
    console.log('PRICE', product.price);
    const idempotencyKey = uuid;

    return stripe.customers.create({
      email: token.email,
      source: token.id
    }).then(customer => {
      stripe.charges.create({
        amount: product.price * 100,
        currency: 'aud',
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchase of ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            country: token.card.address_country
          }
        }
      }, {idempotencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})

app.use('/subcategories', subcategories);

//listen

const port = process.env.PORT || 8080;
app.listen({port}, () => console.log(`listning on port ${port}....`));