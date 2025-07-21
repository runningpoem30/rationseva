const express = require("express");
const { Product } = require("../model/product.model");
const { Vendor } = require("../model/vendor.model");
const { Category } = require("../model/category.model");
const { Subcategory } = require("../model/subcategory.model");
const { uploadToCloudinary } = require("../util/cloudinary");
const mongoose = require("mongoose");
const { Address } = require("../model/address.model");

//specific to a vendor - all the products which has been added only by him
const viewAllVendorProducts = async (req, res) => {
  try {
    const vendorId = req.vendorId;
    const product = await Product.find({ createdBy: vendorId });

    return res.status(200).json({
      success: true,
      error: false,
      data: product,
      message: "fetched all the products",
    });
  } catch (error) {
    res.status(500).json({ message: "error fetching all the products" });
  }
};

//everyone can view - vendor and users both
const viewAllProducts = async (req, res) => {
  try {
    const { category, subCategory, lat, lng } = req.query;
    const query = {};

    if (category) {
      const categoryDoc = await Category.findOne({ name: category });
      if (!categoryDoc) {
        return res.status(404).send({ message: "No Category Found" });
      }
      query.category = categoryDoc._id;
    }

    if (subCategory) {
      const subCategoryDoc = await Subcategory.findOne({ name: subCategory });
      if (!subCategoryDoc) {
        return res.status(200).send({ message: "no subcategory found" });
      }
      query.subCategory = subCategoryDoc._id;
    }

    let nearByAddress = [];
    if (lat && lng) {
      nearByAddress = await Address.find({
        coordinates: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(lng), parseFloat(lat)],
            },
            $maxDistance: 5000,
          },
        },
      }).select("_id");
    }

    const nearbyVendors = await Vendor.find({
      addresses: { $in: nearByAddress.map((addr) => addr._id) },
    }).select("_id");

    if (nearByAddress.length > 0) {
      query.createdBy = { $in: nearbyVendors.map((v) => v._id) };
    }

    console.log(query);

    const findProduct = await Product.find(query)
      .populate("createdBy", "shopName")
      .populate("category", "name")
      .populate("subCategory", "name");

    return res.json(findProduct);

    return res.status(200).json({
      success: true,
      error: false,
      data: product,
      message: "fetched all the products",
    });
  } catch {
    return res.status(500).json({ message: "error fetching all the products" });
  }
};

const createProduct = async (req, res) => {
  try {
    const vendorId = req.vendorId;
    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(500).send("Vendor not found");
    }

    const images = req.files;
    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await uploadToCloudinary(images[i].buffer);
      imagesLinks.push(result.secure_url);
    }

    const {
      name,
      categoryName,
      subCategoryName,
      unit,
      stock,
      discount,
      description,
    } = req.body;

    const [categoryExists, subCategoryExists] = await Promise.all([
      Category.findOne({ name: categoryName }),
      Subcategory.findOne({ name: subCategoryName }),
    ]);

    if (!categoryExists || !subCategoryExists) {
      return res
        .status(400)
        .json({ message: "invalid category or subcategory" });
    }

    const product = await Product.create({
      name,
      image: imagesLinks,
      createdBy: vendorId,
      category: categoryExists._id,
      subCategory: subCategoryExists._id,
      unit,
      stock,
      discount,
      description,
    });

    return res.status(201).json({
      success: true,
      error: false,
      message: "Product Successfully created",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating the product . Please try again ",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const vendorId = req.vendorId;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const { productId } = req.params;
    console.log(productId);
    console.log(vendorId);

    const product = await Product.findOne({
      _id: productId,
      createdBy: vendorId,
    });

    console.log(product);

    if (!product) {
      return res.status(404).json({
        message: "Product not found or you don't have permission to edit it",
      });
    }

    const updateFields = {};

    const {
      name,
      categoryName,
      subCategoryName,
      unit,
      stock,
      discount,
      description,
    } = req.body;

    if (name) updateFields.name = name;
    if (unit) updateFields.unit = unit;
    if (stock) updateFields.stock = stock;
    if (discount) updateFields.discount = discount;
    if (description) updateFields.description = description;

    // Handle category and subcategory if provided
    if (categoryName || subCategoryName) {
      const promises = [];

      if (categoryName) {
        promises.push(Category.findOne({ name: categoryName }));
      } else {
        promises.push(null);
      }

      if (subCategoryName) {
        promises.push(Subcategory.findOne({ name: subCategoryName }));
      } else {
        promises.push(null);
      }

      const [categoryExists, subCategoryExists] = await Promise.all(promises);

      if (categoryName && !categoryExists) {
        return res.status(400).json({ message: "Invalid category" });
      }

      if (subCategoryName && !subCategoryExists) {
        return res.status(400).json({ message: "Invalid subcategory" });
      }

      if (categoryExists) updateFields.category = categoryExists._id;
      if (subCategoryExists) updateFields.subCategory = subCategoryExists._id;
    }

    // Handle images if they exist in the request
    if (req.files && req.files.length > 0) {
      const images = req.files;
      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await uploadToCloudinary(images[i].buffer);
        imagesLinks.push(result.secure_url);
      }

      updateFields.image = imagesLinks;
    }

    // Update the product and get the updated document
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateFields,
      { new: true } // This returns the updated document instead of the original
    );

    return res.status(200).json({
      success: true,
      error: false,
      message: "Product successfully updated",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);
    return res.status(500).json({
      message: "Error updating the product. Please try again",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const vendorId = req.vendorId;
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    const { productId } = req.params;
    console.log(productId);
    console.log(vendorId);

    const product = await Product.findOne({
      _id: productId,
      createdBy: vendorId,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found or you don't have permission to edit it",
      });
    }

    const deleteProduct = await Product.findByIdAndDelete(productId, product, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      error: false,
      message: "Product successfully deleted",
    });
  } catch (error) {
    console.error("Update product error:", error);
    return res.status(500).json({
      message: "Error updating the product. Please try again",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  viewAllVendorProducts,
  viewAllProducts,
};
