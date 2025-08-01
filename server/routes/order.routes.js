const {orderProduct} = require("../controllers/order.controller")
const Router = require("router");
const { Order } = require("../model/ordeer.model");
const { auth } = require("../middleware/auth.middleware");

const OrderRouter = Router();

OrderRouter.post('/place-order' , auth ,  orderProduct)


module.exports =  OrderRouter
