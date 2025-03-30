const mongoose = require("mongoose")
const validator = require ("validator")
const subcategorySchema = new mongoose.Schema({
  name : {
    required : true , 
    type : String
  },
  image : {
    type : String ,
    validate : {
        validator : function (url){
          return validator.isURL(url)
        },
        message : `invalid URL`
    }
  },
  categoryId : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'Category',
    required : true
  },
  createdBy :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
  }
},{
  timestamps : true
})


const Subcategory = mongoose.model('Subcategory' , subcategorySchema)

module.exports = {
  Subcategory
}