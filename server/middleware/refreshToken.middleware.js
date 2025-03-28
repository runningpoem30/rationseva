const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()


const authRefresh = async (req , res, next) => {
  try {
    const token = req.cookies.refreshToken
    console.log(token)
    if(!token) {
      return res.status(400).send("Please provide token")
    }

    const decode = await jwt.verify(token , process.env.REFRESH_TOKEN_KEY);


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

const vendorAuthRefresh = async(req , res , next) => {
  try {
    const token = req.cookies.refreshToken
    if(!token) {
      return res.status(400).send("Please provide token")
    }

    const decode = await jwt.verify(token , process.env.REFRESH_TOKEN_KEY);

    if(!decode) {
      return res.status(400).json({ message : "unauthorized access"})
    }
  
    req.vendorId = decode.vendorId; 
    next()

  }
  catch(error) {
    res.status(401).json({message : "unauthorized access" , error : error})
  }
}



module.exports = {
  authRefresh,
  vendorAuthRefresh
}