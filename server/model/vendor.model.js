const mongoose = require("mongoose")
const validaotr = require("validator")
const vendorSchema = new mongoose.Schema({
  shopName :{
    minLength : 4,
    type : String,
    required : true
  }, 
  email :{
    required : true ,
    type : String ,
    validate : {
      validator : function (email){
        return validator.isEmail(email)
      },
      message : 'Please enter a valid email'
    }
  },
  password : {
    type : String , 
    required : true
  },
  avatar : {
    type : String ,
    validate : {
      validator : function (url){
        return validator.isURL(url)
      },
      message : `Invalid URL`
    }
  },
  phone : {
    type : String , 
    validate : {
     validator : function (phone){
       return phone && validator.isMobilePhone(phone , "any"  )
     },
     message : `Invalid phone number`
    }
 },
  address : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'Address',
    required : true
  },

})




const Vendor = mongoose.model('Vendor' , vendorSchema)

module.exports = {
  Vendor
}

