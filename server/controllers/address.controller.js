const { Address } = require("../model/address.model")
const { Product } = require("../model/product.model")
const {User} = require("../model/user.model")
const {Vendor} = require("../model/vendor.model")
const {geoCodeAddress} = require("../util/geoCodeAddress")


const addAddress = async (req , res) => {
  try {   
    const id = req.vendorId || req.id;
    console.log(id)
    const role = req.role;
 
   if (!id || !role) {
     return res.status(401).json({ message: "Unauthorized" });
   }


     const {addressLine , city , state , pincode, mobile } = req.body;
     //console.log(req.body)

    const coordinates = await geoCodeAddress(`${addressLine} , ${city}  , ${state} , ${pincode}`)
    console.log(coordinates)

    const [longitude , latitude] = coordinates
     if(!addressLine || !city || !state || !pincode || !mobile) {
       return res.status(400).json({message : "Please enter all the required fields"})
     }


     const address = new Address({addressLine , city , state , pincode , mobile , [role] : id , coordinates : coordinates})
     await address.save()

     const ownerModel = role === 'user' ? User : Vendor
     console.log(ownerModel)

     await ownerModel.findByIdAndUpdate(id , {$push : {addresses : address._id}})

     const findVendor = await Vendor.findById(id).populate('addresses')
     console.log(findVendor)
     
     return res.status(200).json({
      success : true , 
      message : 'Saved Address Successfully',
      data : address
     })
  }
  catch(error){
    console.log(error)
    res.status(400).json({
      error : error , 
      message : 'failed adding address'

    })
  }
}

const deleteAddress = async (req ,res) =>  {
  try {
    const {id , role} = req;

    if(!id || !role){
      return res.status(400).json({message  : "unauthorized"}) // this is only authenticating 
    }
    
    const addressId = req.params.addressId ; 
    const address = await Address.findOne({
      _id : addressId , 
      [role] : id
    })

    if(!address){
      return res.status(404).json({
        message :  "address not found or you dont have permission to delete the it"
      })
    }

    await Address.findByIdAndDelete(addressId);
    const ownerModel = role === 'user' ? User : Vendor

    await ownerModel.findByIdAndUpdate(id , {
      $pull : {addresses : addressId} //we are removing this from the array which was created , 
    })
  }
  catch(error){
    return res.status(400).json({
      error : true , 
      message : "failed deleting the product "
    })
  }
}





module.exports = {addAddress , deleteAddress}