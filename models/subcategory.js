const Joi = require('joi');
const mongoose = require('mongoose');



const subCategorySchema = new mongoose.Schema({
    names:String,
   
})

const Subcategory = mongoose.model('Subcategory',subCategorySchema);



function validateSubCategory(subCategory) {
    const schema ={
      name: Joi.string().min(3).required(),
    };
    return Joi.validate(subCategory, schema);
};




exports.subvalidate = validateSubCategory;
exports.Subcategory = Subcategory;
exports.subCategorySchema = subCategorySchema;

