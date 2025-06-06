const Router = require("router")
const ProductRoute = Router()
const {vendorAuth} = require('../middleware/auth.middleware')
const { upload } = require("../middleware/file.middleware")
const { createProduct , updateProduct , deleteProduct , viewAllVendorProducts , viewAllProducts, getProduct} = require("../controllers/product.controller")
const { Product } = require("../model/product.model")



ProductRoute.get('/view-all-products' , viewAllProducts)
ProductRoute.get('/view-all-vendor-products' , vendorAuth ,  viewAllProducts)
ProductRoute.post('/create-product' , vendorAuth , upload.array('images') , createProduct  )
ProductRoute.put('/:productId/update-product', vendorAuth, upload.array('images', 5), updateProduct)
ProductRoute.post('/:productId/delete-product', vendorAuth, deleteProduct)
ProductRoute.get('/product' , getProduct)

module.exports = ProductRoute

