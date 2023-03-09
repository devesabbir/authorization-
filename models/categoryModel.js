const mongoose = require('mongoose');


const CategorySchema = mongoose.Schema({
     name:{
         type:String,
         unique:true,
         required:true
     },
     slug:{
         type:String,
         lowercase:true,
     }
})

const CategoryModel = mongoose.model('Category', CategorySchema);
module.exports = CategoryModel;
