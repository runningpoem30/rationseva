const Router = require("router");
const CartRouter = Router();
const { auth } = require("../middleware/auth.middleware");
const { addProductToCart , getCart } = require("../controllers/cart.controller");

CartRouter.post("/add-items-to-cart/", auth, addProductToCart);
CartRouter.get("/get-cart" , auth , getCart);
module.exports = CartRouter;
