const Router = require('router')
const vendorRouter = Router()
const { createVendor , verifyVendor , loginVendor , logoutVendor, updateVendor , updateAvatar} = require("../controllers/vendor.controller")
const { vendorAuth } = require('../middleware/auth.middleware')
const { upload } = require('../middleware/file.middleware')
const { refreshToken } = require('../controllers/user.controller')
const { vendorAuthRefresh } = require('../middleware/refreshToken.middleware')

vendorRouter.post('/create-vendor' , createVendor)
vendorRouter.get('/verify/:id/:token' , verifyVendor)
vendorRouter.post('/login' , loginVendor)
vendorRouter.post('/logout' , vendorAuth , logoutVendor)
vendorRouter.put('/update-vendor' , vendorAuth , updateVendor)
vendorRouter.put('/update-avatar' , vendorAuth , upload.single('avatar') , updateAvatar)
vendorRouter.post('/refresh-token' ,   vendorAuthRefresh , refreshToken)


module.exports = vendorRouter
