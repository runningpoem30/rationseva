const { upload } = require("../middleware/file.middleware");
const Category = require("../model/category.model");
const { User } = require("../model/user.model");
const { uploadToCloudinary } = require("../util/cloudinary");

const createCategory = async (req , res) => {
  try{
    const adminId = req.adminId;
    const admin = await User.findById({adminId})

    if(!admin){
      return res.status(500).send('Unauthorized access')
    } 

    const images = req.file 
    const result = await uploadToCloudinary(images.buffer);


    const { name } = req.body ;
    const category  = await Category.create({name : name , image : image})

    res.status(201).json({
      success : true , 
      message : "Category created successfully" , 
      category
    })

  }
  catch(error){
    res.status(500).json({message : "Error creating category " , error : error.message})
  }
}

module.exports = {
   createCategory
}