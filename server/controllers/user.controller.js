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
    

    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , 10)
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
    console.log(findUser)
    const checkPassword = await bcrypt.compare(password, findUser.password);

    console.log("Entered password:", password);
    console.log("Stored hash:", findUser.password);
    console.log("Password comparison result:", checkPassword);

    if(!checkPassword){
      return res.status(400).json({message : "Invalid Credentials"})
    }

 
    const accessToken = jwt.sign({ userId : findUser._id , role : findUser.role } , process.env.ACCESS_TOKEN_KEY , {expiresIn : '10m'})

    const refreshToken = jwt.sign({ userId : findUser._id , role : findUser.role} , process.env.REFRESH_TOKEN_KEY , {expiresIn : '7d'})

    const cookieOption  = {
      httpOnly : true , 
      secure : true ,
      sameSite : "None"
    }

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
        error : error, 
        message : 'Error logging in user',

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

const updateUser = async (req, res) => {
  try {
    const id = req.id; // Extracted from the authentication middleware

    if (!id) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, phone, password, address } = req.body;


    const updateFields = {};
    if (name) updateFields.name = name;
    if (phone) updateFields.phone = phone;
    if (address) updateFields.address = address;


    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      error: true,
      message: "Error updating user",
      errorDetails: error.message, // Include the error message for debugging
    });
  }
};

const updateAvatar = async (req, res) => {
  try {

    const userId = req.id;
    const image = req.file;
    console.log(image)

    if (!image) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "No file uploaded",
      });
    }

    const result = await uploadToCloudinary(image.buffer);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: result.secure_url },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      error: false,
      message: "Avatar successfully updated",
      avatarUrl: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: "Failed to update the avatar of the user",
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const userId = req.id; // Extracted from the refresh token middleware
    const refreshToken = req.cookies.refreshToken; // Get refreshToken from cookies

    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }



    const newAccessToken = jwt.sign({ userId: userId }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '15m' });


    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    };
    res.cookie('accessToken', newAccessToken, cookieOptions);


    return res.status(200).json({
      success: true,
      error: false,
      message: "Access token successfully created",
      accessToken: newAccessToken, // Optionally send the new access token in the response
    });
  } catch (error) {
    console.error("Error in refreshToken Controller:", error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      error: true,
      message: "Error creating an access token",
      errorDetails: error.message, // Include the error message for debugging
    });
  }
};

module.exports = {
  signupUser ,
  loginUser,
  logoutUser,
  verifyUser,
  updateUser,
  updateAvatar,
  refreshToken
}







