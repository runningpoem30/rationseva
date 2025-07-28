const { upload } = require("../middleware/file.middleware");
const { Category } = require("../model/category.model");
const { Subcategory } = require("../model/subcategory.model")
const { User } = require("../model/user.model");
const { uploadToCloudinary } = require("../util/cloudinary");


const createCategory = async (req , res) => {
  try{
    const adminId = req.adminId;
    const admin = await User.findById(adminId)

    if(!admin){
      return res.status(500).send('Unauthorized access')
    } 

    const images = req.file 

    const result = await uploadToCloudinary(images.buffer);


    const { name } = req.body ;
    const existingCategory = await Category.findOne({name : name})
    if(existingCategory){
      return res.status(200).json({message : "Category already exists"})
    }
    const category  = await Category.create({name : name , image : result.secure_url , createdBy : adminId})

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


const createSubCategory = async (req , res) => {
  try{
    const adminId = req.adminId;
    const admin = await User.findById(adminId)

    if(!admin){
      return res.status(500).send('Unauthorized access')
    } 

    const { name , categoryName } = req.body ;

    
    const images = req.file 
    const result = await uploadToCloudinary(images.buffer);
    
   

    const category = await Category.findOne({name : categoryName})
    if(!category){
      return res.status(404).json({
        success : false ,
        message : `Category ${categoryName} not found`
      })
    }


    const subCategory  = await Subcategory.create(
      {
      name : name ,
      image : result.secure_url , 
      categoryId : category._id ,  
      createdBy : adminId
    })

    res.status(201).json({
      success : true , 
      message : "Sub-Category created successfully" , 
    })

  }
  catch(error){
    res.status(500).json({message : "Error creating category " , error : error.message})
  }
}


module.exports = {
   createCategory,
   createSubCategory
}






