const express = require("express");
const mongoose = require("mongoose")
const { databaseConnect } = require("./util/database")
const PORT = 8000
const app = express()
const userRoutes = require('./routes/user.routes')
const cookieParser = require('cookie-parser')
require("dotenv").config()

app.use(express.json())
app.use(cookieParser())




app.use('/api/user' , userRoutes)





databaseConnect().then(() => {
  app.listen(PORT , () => {
    console.log(`App is listening on PORT ${PORT}`)
  })
}).catch(() => {
  console.log("Error connecting to the database bitch")
})



//  when you have the vision and you are able to manifest but also put the work in , magic happens man , magic happens//