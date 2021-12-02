const mongoose = require('mongoose');
const express = require('express');
const app =express();
const categories = require('./routes/categories.js');
const cors = require("cors");

mongoose.connect('mongodb://localhost/investor')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB....'));

var corsOptions = {
    origin:'http://localhost:3000',
  };
  
  app.use(cors(corsOptions));

app.use(express.json());


app.use('/categories', categories);

app.get('/', (req, res) => {
    res.json('Hello!! Welcom on Investor Portal...');
});

const port = process.env.PORT || 8080;
app.listen({port}, () => console.log(`listning on port ${port}....`));