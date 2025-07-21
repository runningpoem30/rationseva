const { Cart } = require("../model/cart.model");
const { Product } = require("../model/product.model");

const addProductToCart = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status.json({
        success: false,
        message: "Invalid Credentials , Please login into the app first",
      });
    }

    const { productName, quantity } = req.body;

    const productExists = await Product.findOne({ name: productName });

    if (!productExists) {
      return res.status.send("product doesnt exist");
    }

    let cart = await Cart.findOne({ userId });
    console.log(cart);
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId: productExists._id, quantity }],
      });
    } else {
      const index = cart.items.findIndex(
        (items) => items.productId.toString() === productExists._id.toString()
      );
      if (index > -1) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ productId: productExists._id, quantity });
      }
    }

    await cart.save();
    return res.status(201).json({
      success: true,
      message: "Item added to cart successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "error adding product to cart",
    });
  }
};

const updateCart = async (req, res) => {
  try {
  } catch (error) {}
};
module.exports = {
  addProductToCart,
};
