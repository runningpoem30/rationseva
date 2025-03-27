const express = require("express")
const Product = require("../model/product.model")
const Vendor = require('../model/vendor.model')
const Category = require('../model/category.model')
const Subcategory = require("../model/subcategory.model")
const { uploadToCloudinary } = require("../util/cloudinary")


const createProduct = async(req , res) => {
  try {
    const vendorId = req.vendorId;

    const vendor = await Vendor.findById(vendorId)

    if(!vendor){
      return res.status(500).send("Vendor not found")
    }

    const images = req.files;
    const imagesLinks = [] ;

    for (let i = 0 ; i < images.length ; i++) {
      const result = await uploadToCloudinary(images[i].buffer); //uploading the images to cloudinary

      imagesLinks.push(result.secure_url)
    }

    const {name ,  Category , Subcategory , unit , stock , discount , description } = req.body;

    const product = await Product.create({name , image : imagesLinks , Category , Subcategory , unit , stock , discount , description})

    return res.status(201).json({
      success : true , 
      error : false ,
      message : 'Product Successfully created',
      product : product
    })
  }
  catch(error) {
    return res.status(500).json({message : "Error creating the product . Please try again " , error : error})
  }
}

module.exports = {
  createProduct
}