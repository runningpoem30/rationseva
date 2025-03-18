const express = require("express")
const Product = require("../model/product.model")
const Vendor = require('../model/vendor.model')
const Category = require('../model/category.model')
const Subcategory = require("../model/subcategory.model")
const { uploadToCloudinary } = require("../util/cloudinary")


const createProduct = async(req , res) => {
  try {
    const vendorId = req.vendorId;
    const images = [];
    const vendor = await Vendor.findById(vendorId)

    if(!vendor){
      return res.status(500).send("Vendor not found")
    }

    images = req.body.images;
    

    const result = await uploadToCloudinary(image.buffer)

    const {name ,  Category , Subcategory , unit , stock , discount , description } = req.body;

    const product = await Product.create({name , image : image.secure_url , Category , Subcategory , unit , stock , discount , description})

    return res.status(201).json({
      success : true , 
      error : false ,
      message : 'Product Successfully created',
      product : product
    })
    
  }
  catch {
    return res.status(500).json({message : "Error creating the product . Please try again "})
  }
}