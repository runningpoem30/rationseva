const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()


const auth = async (req , res, next) => {
  try {
    const token = req.cookies.accessToken
    if(!token) {
      return res.status(400).send("Please provide token")
    }

    const decode = await jwt.verify(token , process.env.ACCESS_TOKEN_KEY);
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

const vendorAuth = async(req, res , next) => {
  try{
    const token = req.cookies.accessToken
    console.log(token)
    if(!token){
      return res.status(400).json({message : "Please provide token"})
    }

    const decode = await jwt.verify(token , process.env.ACCESS_TOKEN_KEY)
    console.log(decode)

    if(!decode){
      return res.status(400).json({message : "unauthorized access"})
    }

    req.vendorId = decode.vendorId
    next()

  }
  catch(error)  {
    res.status(401).json({message : "unauthorized access" , error : error})
  }
}

const adminAuth = async (req , res , next) => {
  try {
    const token = req.cookies.accessToken
    console.log(token)
    if(!token){
      return res.status(400).json({message : "Please provide token"})
    }

    const decoded = jwt.verify(token , process.env.ACCESS_TOKEN_KEY)

    if(decoded.role !== 'admin'){
      return res.status(403).json({message  : "admin role required"})
    }

    console.log(decoded.role)

    //attaching user data to the request 
    req.adminId = decoded.userId;
    next()
  }
  catch(error){
    res.status(500).json({message :  "unauthorized access " , error : error})
  }
}




module.exports = {
  auth,
  vendorAuth,
  adminAuth
}


//https://monetoad.com/woqL4W4PB0