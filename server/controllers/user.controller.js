const express = require("express")
const mongoose = require("mongoose")
const { User } = require("../model/user.model")
const bcrypt = require("bcryptjs")
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
require("dotenv").config()
const nodemailer = require("nodemailer")
const { sendEmail } = require("../util/sendEmail")
const { uploadToCloudinary } = require("../util/cloudinary")


const signupUser = async (req , res) => {
  try {
    const { name , email  , password } = req.body;


    if(!name || !email || !password){
      return res.status(400).json({message : "Please Enter all necessary fields"})
    }

    const existingUser = await User.findOne({ email });
    if(existingUser){
      return res.status(400).json({message : "User already registered"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt)

    const newUser = new User({name : name , email : email , password : hashedPassword})
    await newUser.save()


  const verificationToken = jwt.sign({userId : newUser._id}, process.env.ACCESS_TOKEN_KEY , {expiresIn : '15m'})

  const url = `${process.env.FRONTEND_URL}/api/user/verify/${newUser._id}/${verificationToken}`
  await sendEmail(newUser.email , "Please Verify Your Email" , url)
  
    return res.status(201).json({
      success : true ,
      error : false ,
      message : 'User successfully registered , Please check your email to verify'
    })

  }

  catch(error) {
    return res.status(400).json({
      success : false ,
      error : true ,
      message : `Something went wrong  - Error registering user`,
      details : error.message
    })
  }
}

const loginUser = async (req , res ) => {
  try {
    const { email , password } = req.body;

    const findUser = await User.findOne({email})

    if(!findUser) {
      return res.status(400).json({message : "User is not registered"})
    }
    const checkPassword = await bcrypt.compare(password , findUser.password);

    if(!checkPassword){
      return res.status(400).json({message : "Wrong password"})
    }

    const accessToken = jwt.sign({ userId : findUser._id} , process.env.ACCESS_TOKEN_KEY , {expiresIn : '1h'})

    const refreshToken = jwt.sign({ userId : findUser._id} , process.env.REFRESH_TOKEN_KEY , {expiresIn : '1m'})

    const cookieOption  = {
      httpOnly : true , 
      secure : true ,
      sameSite : "Lax"
    }

    const updateUser = await User.findOneAndUpdate({_id : findUser.id} , {accessToken : accessToken});


    res.cookie('accessToken' , accessToken , cookieOption)
    res.cookie('refreshToken' , refreshToken ,  cookieOption)

   return  res.status(200).json({
      success : true  , 
      error : false ,
      message : `User successfully logged in` , 
      accessToken : accessToken ,
      refreshToken : refreshToken
    })

  }
  catch (error) {
      return res.status(400).json({
        success : false , 
        error : true , 
        message : 'Error logging in user',
        error : `error`
      })
  }
}

const logoutUser = async (req , res) => {
  try {
      const cookieOption = {
        httpOnly : true ,
        secure : true , 
        sameSite : 'None'
      }
      res.clearCookie('accessToken' , cookieOption)
      res.clearCookie('refreshToken' , cookieOption)
    
      res.status(200).json({message : "User successfully logged out"})
  }
  catch (error){
    res.status(400).json({
      success : false,
      error : true,
      message : "Error logging out user"
    })
  }
 
}

const verifyUser = async (req, res) => {
  try {
     
    const user = await User.findOne({_id : req.params.id})
    if(!user){
      return res.status(400).json({message : "User not found"})
    }

    const token = await jwt.verify(req.params.token , process.env.ACCESS_TOKEN_KEY)
    if(!token){
      return res.status(400).json({message : "Invalid user"})
    }
    console.log(token)

    await User.updateOne({_id : user._id } , {verify_email : true})
    res.status(200).json({
      success : true , 
      error : false , 
      message : "User successfully verified"
    })
  }
  catch(error){
    res.status(400).send({
      success : false , 
      error : true , 
      message : "Error verifying user "
    })
  }
}

const updateUser = async (req , res) => {
  try {
    const id = req.userId

    const { name ,  phone , password ,  address} = req.body ;
    let hashedPassword = "" 

    if(password){
      hashedPassword = bcrypt.hashedPassword(password , 10 )
    }
    const updateUser = await User.findByIdAndUpdate(id , {name : name , phone : phone , password : hashedPassword ,  address : address })


    return res.status(200).json({
      success : true , 
      error : false ,
      message : "Error updating user "
    })
  }
  catch(error) {
      res.status(400).json({
        error  : true  ,
        success : false , 
        message : "Error updating User"
      })
  }
}

const updateAvatar = async (req, res) => {
  try {
    
    console.log(req.userId)
    console.log("Request File:", req.file); // Debugging log
    console.log("Request Body:", req.body); // Debugging log

    const userId = req.userId;
    const image = req.file;
    console.log(image)

    if (!image) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "No file uploaded",
      });
    }
    console.log("Uploading to Cloudinary...");
    const result = await uploadToCloudinary(image.buffer);
    console.log("Cloudinary Upload Result:", result); // Debugging log

    console.log("Updating user avatar in database...");


    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: result.secure_url },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Avatar successfully updated",
      avatarUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({
      error: true,
      success: false,
      message: "Failed to update the avatar of the user",
    });
  }
};

const refreshToken = async (req , res) => {
  try{
    const userId = req.userId;
    const refreshToken = req.cookies.refreshToken ;

    
    const user = await User.findById(userId)

    if(!user || user.refresh_token !== refreshToken){
      return res.status(403).json({message : "Invalid or expired refresh Token "})
    }


    const newAccessToken = jwt.sign({userId : userId} , process.env.ACCESS_TOKEN_KEY , {expiresIn : '15m'});

    const cookieOption  = {
      httpOnly : true , 
      secure : true ,
      sameSite : "Lax"
    }

    res.cookie('accessToken' , accessToken , cookieOption)

    return res.status(200).json({
      success : true ,
      error : false ,
      message: "accessToken successfully created",
      accessToken : newAccessToken
    })
  }


  
  catch(error){
    return res.status(500).json({
      success : false , 
      error : true , 
      message : "Error creating a access token "
    })
  }
}


module.exports = {
  signupUser ,
  loginUser,
  logoutUser,
  verifyUser,
  updateUser,
  updateAvatar,
  refreshToken
}




// forgot password 
// sending the otp 
// password reset 




