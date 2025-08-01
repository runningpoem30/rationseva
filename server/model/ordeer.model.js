const mongoose = require("mongoose")


const orderItemSchema = new mongoose.Schema({
   productId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Product",
    required : true
   },
   name: String,
   price : Number,
   quantity : Number
})


const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    items : [orderItemSchema],
    totalAmount : Number,
    status : {
        type : String , 
        enum : ["pending" , "processing" , "delivered"]
    }
},
{
    timestamps : true
})


const Order = mongoose.model("Order" , orderSchema);
module.exports = {
    Order
}