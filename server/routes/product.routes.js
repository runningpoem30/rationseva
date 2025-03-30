const Router = require("router")
const ProductRoute = Router()
const {vendorAuth} = require('../middleware/auth.middleware')
const { upload } = require("../middleware/file.middleware")
const { createProduct } = require("../controllers/product.controller")
const { Product } = require("../model/product.model")




ProductRoute.post('/create-product' , vendorAuth , upload.array('images') , createProduct  )

module.exports = ProductRoute