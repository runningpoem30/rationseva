
const mongoose = require("mongoose")
const {Vendor}= require("../model/vendor.model")
const bcrypt = require("bcryptjs")
const { sendEmail } = require("../util/sendEmail")
const jwt = require("jsonwebtoken")
const { uploadToCloudinary } = require("../util/cloudinary")
require('dotenv').config()

const createVendor = async (req , res) => {
  try{
    const { shopName , email , password } = req.body

    if(!email || !shopName || !email){
      return res.status(500).json({message : "Please enter all the necessary fields"})
    }

    const findVendor = await Vendor.findOne({email})
    if(findVendor){
      res.status(500).json({message : "Vendor already exists"})
    }

    const hashedPassword = await bcrypt.hash(password , 10)

    const newVendor = new Vendor({shopName : shopName , email : email , password : hashedPassword})
    newVendor.save()

    const verificationToken = jwt.sign({vendorId : newVendor._id} , process.env.ACCESS_TOKEN_KEY, {expiresIn : '15m'})

    const url = `${process.env.FRONTEND_URL}/api/vendor/verify/${newVendor._id}/${verificationToken}`
    await sendEmail(newVendor.email , "Please Verify Your Email" , url)

    return res.status(200).json({
      success : true , 
      error : false ,
      message : "Successfully created a vendor Please check your email"
    })
  }
  catch(error){
    return res.status(500).json({
      success : false , 
      error : true ,
      message : "Error creating vendor"
    })
  }
}

const verifyVendor = async( req , res) => {
  try {
      const vendorId = req.params.id ; 

      const vendor = await Vendor.findOne({_id : vendorId})

      if(!vendor){
        return res.stauts(400).json({message : "Vendor not found"})
      }

      const token = await jwt.verify(req.params.token , process.env.ACCESS_TOKEN_KEY)
      console.log(token)

      if(!token){
        return res.status(400).json({message : "Invalid User" })
      }

      const updateVendor = await Vendor.updateOne({_id : vendorId} , {verify_email : true})
      console.log(updateVendor)
      return res.status(200).json({
        success : true, 
        error :  false , 
        message : "Vendor successfully verified",
      })
  }
  catch(error) {
    return res.status(500).json({
      success : false , 
      error : true , 
      message : "Error verifying Vendor"
    })
  }
}

const loginVendor = async(req , res) => {
  try {
    const { email , password } = req.body;

    const findVendor = await Vendor.findOne({email})

    if(!findVendor) {
      return res.status(400).json({message : "Vendor is not registered"})
    }
    console.log(findVendor.password)
    const checkPassword = await bcrypt.compare(password , findVendor.password);
    console.log(checkPassword)

    if(!checkPassword){
      return res.status(400).json({message : "Invalid Credentials"})
    }

    const accessToken = jwt.sign({ vendorId : findVendor._id} , process.env.ACCESS_TOKEN_KEY , {expiresIn : '60m'})

    const refreshToken = jwt.sign({ vendorId : findVendor._id} , process.env.REFRESH_TOKEN_KEY , {expiresIn : '7d'})

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
      message : `Vendor successfully logged in` , 
      accessToken : accessToken ,
      refreshToken : refreshToken
    })
  }
  catch (error) {
      return res.status(400).json({
        success : false , 
        error : true , 
        message : 'Error logging in vendor',
        error : `error`
      })
  }
}

const logoutVendor = async(req, res) => {
  try{
     const cookieOption = {
      httpOnly : true , 
      secure : true , 
      sameSite :'None'
     }

     res.clearCookie('accessToken' , cookieOption)
     res.clearCookie('refreshToken' , cookieOption)

     res.status(200).json({message : 'user successfully logged out'})
  }
  catch(error){
    res.status(500).json({
      success : false ,
      error : true , 
      error : "Error logging out the user"
    })
  }
}

const updateVendor = async(req , res) => {
  try{
    const id = req.vendorId

    if(!id){
      return res.status(404).json({message : "Vendor not found"})
    }

    const { shopName , phone , password , address} = req.body
    //creating the update object 
    const updateFields = {}

    if(shopName) updateFields.shopName = shopName;
    if (phone) updateFields.phone = phone;
    if (address) updateFields.address = address;

    if(password){
      const hashedPassword = await bcrypt.hash(password , 10);
      updateFields.password = hashedPassword
    }

    const updateVendor = await Vendor.findByIdAndUpdate(id , updateFields , {new : true})


    return res.status(200).json({
      success: true,
      error: false,
      message: "Vendor updated successfully",
    });
  }

  catch(error) {
    return res.status(500).json({
      success : false , 
      error : true, 
      message : 'error updating the user'
    })
  }
}

const updateAvatar = async(req , res) => {
  try {
    const id = req.vendorId  
    console.log(id)
    if(!id){
      return res.status(404).json({message : "User not found"})
    }
    const image = req.file

    if(!image){
      return res.status(500).json({message : "No file uploaded"})
    }

    const result = await uploadToCloudinary(image.buffer);
    const updatedVendor = await Vendor.findByIdAndUpdate(id , {avatar : result.secure_url} , { new : true})

    return res.status(200).json({
      success: true,
      error: false,
      message: "Avatar successfully updated",
      avatarUrl: result.secure_url,
    });

  }
  catch{
    return res.status(500).json({
      error : true ,
      success : false ,
      message : "Failed to update the avatar of the user "
    })
  }
}

const refreshToken = async (req, res) => {
  try {
    const vendorId = req.vendorId; 
    console.log(vendorId)
    const refreshToken = req.cookies.refreshToken; 

    const vendor = await Vendor.findById(userId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const newAccessToken = jwt.sign({ vendorId: vendorId }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '15m' });

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
      accessToken: newAccessToken, 
    });
  } catch (error) {
    console.error("Error in refreshToken Controller:", error); 
    return res.status(500).json({
      success: false,
      error: true,
      message: "Error creating an access token",
      errorDetails: error.message,
    });
  }
};


module.exports = {
  createVendor,
  verifyVendor,
  loginVendor,
  logoutVendor,
  updateVendor,
  updateAvatar,
  refreshToken
}

