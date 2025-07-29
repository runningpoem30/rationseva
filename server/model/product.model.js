const mongoose = require("mongoose")
const validator = require ("validator")

const productSchema = new mongoose.Schema({
  name : { 
    required : true , 
    type : String 
  },
  image : [{
    type : [ String ] , 
    validate : {
      validator : function(url){
        return url.every(url => validator.isURL(url))
      },
      message : `One or more image URL links are invalid `
    }
  }],
  createdBy :{
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'Vendor',
    required : true
  },
  category : {
    required : true ,
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'Category'
  },
  unit : {
    required : true , 
    type : Number
  },
  stock : { 
    required : true , 
    type : Number
  },
  discount : {
    type : Number ,
    default : null
  },
  description : { 
    type : String , 
    required : true 
  },
  moreDetails : {
    type : String ,
    default : null
  }
}, {
  timestamps : true
}
)


const Product = mongoose.model('Product' , productSchema)

module.exports = {
  Product
}