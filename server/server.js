const express = require("express");
const mongoose = require("mongoose")
const { databaseConnect } = require("./util/database")
const { createAdminAccounts } = require("./util/admin")
const PORT = 8000
const app = express()
const userRoutes = require('./routes/user.routes')
const vendorRoutes = require('./routes/vendor.routes')
const productRoutes = require('./routes/product.routes')
const adminRoutes = require('./routes/admin.routes')
const cookieParser = require('cookie-parser')
require("dotenv").config()

app.use(express.json())
app.use(cookieParser())




app.use('/api/user' , userRoutes)
app.use('/api/vendor' , vendorRoutes)
app.use('/api/admin' , adminRoutes)
app.use('/api/product' , productRoutes)





databaseConnect().then(() => {
  createAdminAccounts()
  app.listen(PORT , () => {
    console.log(`App is listening on PORT ${PORT}`)
  })
}).catch(() => {
  console.log("Error connecting to the database bitch")
})

