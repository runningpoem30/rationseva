const Router = require("router")
const addressRouter = Router()
const { addAddress , deleteAddress}  = require("../controllers/address.controller")
const { auth , vendorAuth } = require("../middleware/auth.middleware")


addressRouter.post('/user/add-address' , auth , addAddress)
addressRouter.post('/vendor/add-address' , vendorAuth  , addAddress)
addressRouter.post('/user/delete-address/:addressId' , auth , deleteAddress)
addressRouter.post('/vendor/delete-address/:addressId' , vendorAuth , deleteAddress)


module.exports =  addressRouter 