const express  = require("express");
const Router = require('router')
const { 
    signupUser 
  , loginUser 
  , logoutUser 
  , verifyUser 
  , updateUser 
  , updateAvatar
  , refreshToken
} =  require('../controllers/user.controller')
const { auth } = require('../middleware/auth.middleware')
const { upload } = require("../middleware/file.middleware")
const userRouter = Router()

userRouter.post('/signup' , signupUser)
userRouter.post('/login' , loginUser)
userRouter.post('/logout' , auth ,  logoutUser)
userRouter.get('/verify/:id/:token' , verifyUser)
userRouter.put('/update-user' , auth , updateUser)
userRouter.put('/update-avatar' , auth , upload.single("avatar"), updateAvatar)
userRouter.post('/refresh-token' , auth , refreshToken)







module.exports = userRouter
