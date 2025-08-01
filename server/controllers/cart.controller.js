const { Cart } = require("../model/cart.model");
const { Product } = require("../model/product.model");
const { updateProduct } = require("./product.controller");


const addProductToCart = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Missing product or quantity" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const qty = Number(quantity);

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += qty;

      // Remove item if quantity goes to zero or below
      if (existingItem.quantity <= 0) {
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
      }
    } else {
      // Only add if quantity is greater than 0
      if (qty > 0) {
        cart.items.push({ productId, quantity: qty });
      }
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      error: false,
      data: cart,
      message: "Successfully added to the cart"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: true,
      message: "Error adding products to the cart"
    });
  }
};


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
