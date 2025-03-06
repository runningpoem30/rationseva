const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
  addressLine : {
    required : true ,
    type : String 
  },
  city : { 
    required : true , 
    type : String 
  },
  state : { 
    required : true , 
    type : String
  },
  pincode : {
    type : Number, 
    required : true
  },
  mobile : {
    type : Number ,
    required : true 
  }
})

const Address  = mongoose.model('Address' , addressSchema)

module.exports = { 
  Address
}