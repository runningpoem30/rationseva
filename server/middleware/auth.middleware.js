const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()


const auth = async (req , res, next) => {
  try {
    const token = req.cookies.accessToken
    if(!token) {
      return res.status(400).send("Please provide token")
    }

    const decode = await jwt.verify(token , process.env.REFRESH_TOKEN_KEY);
    //console.log(decode)

    if(!decode) {
      return res.status(400).json({ message : "unauthorized access"})
    }

    req.userId = decode.userId; 
    next()

  }
  catch(error) {
    res.status(401).json({message : "unauthorized access" , error : error})
  }
}



module.exports = {
  auth
}


//https://monetoad.com/woqL4W4PB0