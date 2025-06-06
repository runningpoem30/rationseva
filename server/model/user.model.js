const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require("bcryptjs")
const userScehma = new mongoose.Schema({
  name : { 
    minLength : 4 , 
    required : true , 
    type : String
  },
  email : {
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
  } , 
  phone : {
     type : String , 
     validate : {
      validator : function (phone){
        return phone && validator.isMobilePhone(phone , "any"  )
      },
      message : `Invalid phone number`
     }
  },
  refresh_token : { 
    type : String
  },
  verify_email : {
    type : Boolean ,
    default : false
  },
  addresses : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Address'
  }],
  orderHistory : [{
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'Order'
  }],
  role : { 
    type : String , 
    enum : ['user' , 'admin']
  }
},{
  timestamps : true
})



const User = mongoose.model('User' , userScehma)

module.exports = {
  User
}

