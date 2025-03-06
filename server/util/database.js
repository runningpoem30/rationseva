const mongoose = require("mongoose")
const env = require("dotenv")
env.config()

const databaseConnect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI),{
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    console.log("Database is successfully connected  ")
  }
  catch {
    return console.log("error connecting to the database")
  }
}

module.exports = {
  databaseConnect
}