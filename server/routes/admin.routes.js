const Router = require("router")
const categoryRouter = Router()
const { createCategory } = require('../controllers/admin.controller')
const { adminAuth } = require('../middleware/auth.middleware')
const { upload } = require('../middleware/file.middleware')


categoryRouter.post('/create-category' , adminAuth , upload.single('avatar') , createCategory )

module.exports = categoryRouter