 const mongoose = require ("mongoose")
 const cartItemSchema = new mongoose.Schema({
   productId : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'Product' , 
    required : true
  },
  quantity : { 
    required : true , 
    type : Number
  }
 })


const cartSchema = new Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId  ,
    ref : 'User',
    required : true
  },
  items : [cartItemSchema]
 },{
  timestamps : true 
 })

 const Cart  = mongoose.model('Cart' , cartSchema)

module.exports = {
  Cart
}
