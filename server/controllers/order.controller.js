const { Order } = require("../model/ordeer.model")
const { Cart } = require("../model/cart.model");
const { Product } = require("../model/product.model");


const orderProduct = async(req , res) => {

    try{
        const userId = req.id;
    if(!userId){
        return res.status(400).json({message : "unauthorized"})
    }

    const cart = await Cart.findOne({userId}).populate("items.productId"); //using this we will get the productIds of all the products which are added in the cart good 


    if(!cart || cart.items.length === 0){
        return res.status(400).json({message : "please add items to the cart"})
    }

    let orderItems = [];
    let total = 0;

    // to see for each product that the product stock should not be less than the quantity given by the user

    for(let i = 0 ; i < cart.items.length ; i++){
        const item = cart.items[i]
        const product = await Product.findById(item.productId)

        if(product.stock < item.quantity){
            return res.status(200).json({message : "insufficient producst cant add"})
        }

        product.stock -= item.quantity;
        await product.save();

        orderItems.push({
            productId : product._id,
            name : product.name,
            price : product.price,
            quantity : item.quantity
        })

        total += product.price * item.quantity;
    }

    const newOrder = await Order.create({
        userId,
        items : orderItems,
        totalAmount : total,
    })

    await Cart.findOneAndDelete({userId});



    return res.status(201).json({
        success : true,
        error : false,
        message : "order placed successfully",
        order : newOrder
    })
    }

    catch(err){
         console.log("Order placement error:", err);
        return res.status(400).json({
            success : false,
            error : true ,
            message : "Error placing order "
        })
    }

}


module.exports = {
    orderProduct
}