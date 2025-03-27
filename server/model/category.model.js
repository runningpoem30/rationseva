const mongoose = require("mongoose");
const validator = require("validator")
const categorySchema = new mongoose.Schema({
  name : {
    type : String ,
    required : true
  },
  image : {
    type : String, 
    validate : {
      validator : function (url){
        return validator.isURL(url)
      },
      message : `invalid URL`
    }
  }
},{
  timestamps : true
})


const Category =  mongoose.model('Category' , categorySchema)


module.exports = { 
  Category
}