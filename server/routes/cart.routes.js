const Router = require("router");
const CartRouter = Router();
const { auth } = require("../middleware/auth.middleware");
const { addProductToCart } = require("../controllers/cart.controller");

CartRouter.post("/add-items-to-cart/", auth, addProductToCart);

module.exports = CartRouter;
