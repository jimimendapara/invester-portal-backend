const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema =new mongoose.Schema({
       
        name: String,
        color: String,

    });

const Category = mongoose.model('Category', categorySchema);


const subCategorySchema = new mongoose.Schema({
    names:String,
    cat: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
})

const Subcategory = mongoose.model('Subcategory',subCategorySchema);



function validateCategory(category) {
    const schema ={
      name: Joi.string().min(3).required(),
    };
    return Joi.validate(category, schema);
};


// function validateSubCategory(subcategory) {
//     const schema ={
//       name: Joi.string().min(3).required(),
//     };
//     return Joi.validate(subcategory, schema);
// };




exports.Category = Category;
exports.validate = validateCategory;
// exports.subvalidate = validateSubCategory;
exports.categorySchema = categorySchema;
exports.Subcategory = Subcategory;
exports.subCategorySchema = subCategorySchema;

