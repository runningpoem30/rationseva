const express = require("express");
const mongoose = require("mongoose");
const { databaseConnect } = require("./util/database");
const { createAdminAccounts } = require("./util/admin");
const PORT = 8000;
const app = express();
const userRoutes = require("./routes/user.routes");
const vendorRoutes = require("./routes/vendor.routes");
const productRoutes = require("./routes/product.routes");
const adminRoutes = require("./routes/admin.routes");
const cartRoutes = require("./routes/cart.routes");
const addressRoutes = require("./routes/address.routes");
const cookieParser = require("cookie-parser");
const User = require("./model/user.model");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/", productRoutes);
app.use("/api/", addressRoutes);
app.use("/api/", cartRoutes);

databaseConnect()
  .then(() => {
    createAdminAccounts();
    app.listen(PORT, () => {
      console.log(`App is listening on PORT ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Error connecting to the database bitch");
  });

// {
//   "email" : "arya30@gmail.com",
//   "shopName" : "arya shop" ,
//   "password" : "123456"
// }

// {
//   "addressLine": "Tech Park, Building 5",
//   "city": "Bangalore",
//   "state": "Karnataka",
//   "pincode": "560001",
//   "mobile": "9123456780",
//   "type": "business"
// }

// {
//   "name" : "akshat",
//   "email":"checktt@gmail.com",
//   "password":"arya"
// }
// {
//   "name" : "arya",
//   "email" : "arya12@gmail.com",
//   "password" : "1234"
// }
