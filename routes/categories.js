const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Category, validate, Subcategory, subvalidate} = require('../models/category.js');

// const category = [
//    {
//     name: 'Ceremonial Speech',
//     color: '#A0FF56'
// }
// ];

const subcategory = [
         {name: 'Gerals Smith'},
        {name: 'Ashley White'},
        {name: 'Annie Ly'},
        {name: 'Cam Aiello'},
        {name: 'Gabriel Kim'},
        {name: 'Maria Caliente'},
        {name: 'Chloe Lux'},
        {name: 'Doris Wood'},
]


router.get("/", async (req, res) => {
     const categories = await Category.find().sort('name');
    res.send(categories);
});

router.get("/", async (req, res) => {
    const subCategories = await Subcategory.find().sort('name');
   res.send(subCategories);
});


router.get("/:id", async (req, res) => {
    const category = await Category.findById(req.params.id);

   //const genre = genres.find((c)=> c.id == parseInt(req.params.id));
   if(!category) return res.status(404).send("The category was not found");
   
   res.send(category);
})

// router.post("/", async (req, res) => {
//     const {error} = validate(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

//     let genre = new Genre({name: req.body.name});
//     genre = await genre.save();

//     res.send(genre);
    
// });

// router.put("/:id", async (req, res) => {
//     const {error} = validate(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

//     const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true});

//     //const genre = genres.find((c)=> c.id == parseInt(req.params.id));
//     if(!genre) return res.status(404).send("The genre with give Id was not exist");

    
//    //genre.name = req.body.name;
//     res.send(genre);

// });



    
module.exports = router;