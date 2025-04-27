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
  },
  user : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'User'
  },
  vendor : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'Vendor'
  },
  coordinates : {
    type : [Number],
    index : '2dsphere'
  }
})

const Address  = mongoose.model('Address' , addressSchema)

module.exports = { 
  Address
}