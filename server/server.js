const express = require("express");
const cors = require("cors")
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
const jwt = require("jsonwebtoken")
require("dotenv").config();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/", productRoutes);
app.use("/api/", addressRoutes);
app.use("/api/", cartRoutes);


app.get('/api/whoami' , async (req , res) => {
  const token = req.cookies.accessToken;
  console.log(token)
  if (!token) return res.status(401).json({ role: null });
  try{
      const decode = jwt.verify(token , process.env.ACCESS_TOKEN_KEY )
      console.log(decode)
      res.status(200).json({role : decode.role})
  }
  catch(err){
    res.status(400).json({role : null})
  }


})
app.get('/' , (req, res) => {
  res.send("hi there")
})
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

// {
//   "name" : "arya",
//   "email" : "arya12@gmail.com",
//   "password" : "1234"
// }
