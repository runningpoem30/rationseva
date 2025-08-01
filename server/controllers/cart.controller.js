const { Cart } = require("../model/cart.model");
const { Product } = require("../model/product.model");
const { updateProduct } = require("./product.controller");


const addProductToCart = async(req ,res) => {
  try{

    const userId = req.id; // you are getting this from middleware
    console.log(userId)
    if(!userId){
      return res.status(404).json({message : "not authorized "})
    }

    const {productId , quantity} = req.body;

    if(!productId || !quantity){
      return res.status(400).json({message : "missing products or quantity"})
    }

    const product = await Product.findById(productId);

    if(!product){
      return res.status(404).json({message : "product not found nigga"})
    }

    let cart = await Cart.findOne({userId})

    if(!cart){
      cart = new Cart({userId , items:[]})
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId)

    const qty = Number(quantity)
      
    if(existingItem){
      existingItem.quantity += qty
    }
    //else
  //   if (existingItem.quantity <= 0) {
  //          cart.items = cart.items.filter(item => item.productId.toString() !== productId);
  // }
  //   else{
  //     if( qty > 0){
  //         cart.items.push({productId , quantity})
  //     }
    
  //   }

    await cart.save()
    
    res.status(200).json({
      error : false ,
      success : true ,
      data : cart,
      message : "successfully added to the cart"
    })
    
  }
  catch(err){
    console.log(err)
    res.status(400).json({
      error : true ,
      message : "error adding products to the cart"
    })
  }
}

const getCart = async (req, res) => {
  try {
    const userId = req.id; 

    if (!userId) {
      return res.status(400).json({ message: "User not found" });
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(200).json({ items: [] }); 
    }
    console.log(cart)

    return res.status(200).json({
      success: true,
      error: false,
      items: cart.items,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Error fetching cart",
    });
  }
};

 
module.exports = {
  addProductToCart,
  getCart
};
