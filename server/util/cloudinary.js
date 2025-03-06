
const cloudinary = require("cloudinary").v2;
require("dotenv").config()
const fs = require("fs")


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure : true
});



const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {l
    console.log("Starting Cloudinary upload..."); // Debugging log
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error); // Debugging log
          reject(error);
        } else {
          console.log("Cloudinary Upload Result:", result); // Debugging log
          resolve(result);
        }
      }
    );

    uploadStream.end(fileBuffer);
  }); 
};

module.exports = {
  uploadToCloudinary,
};