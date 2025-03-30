const Router = require("router")
const categoryRouter = Router()
const { createCategory , createSubCategory } = require('../controllers/admin.controller')
const { adminAuth } = require('../middleware/auth.middleware')
const { upload } = require('../middleware/file.middleware')


categoryRouter.post('/create-category' , adminAuth , upload.single('image') , createCategory )
categoryRouter.post('/create-sub-category' , adminAuth , upload.single('image') , createSubCategory )



module.exports = categoryRouter
