const mongoose = require("mongoose");
const {User} = require("../model/user.model")
const bcrypt = require("bcryptjs")


const admins = [
  {
    name : 'Arya',
    email : 'septarya30@gmail.com',
    password : '123456',
    role : 'admin'
  },
  {
    name : 'archie' ,
    email : 'archie.644@gmail.com',
    password : '123456',
    role : 'admin'
  }
]


const createAdminAccounts = async () => {
  try {
    for (let admin of admins){
      const hashedPassword = await bcrypt.hash(admin.password , 10);
      await User.create({
        name : admin.name , 
        email : admin.email , 
        password : hashedPassword , 
        role : admin.role
      })
    }
    console.log('Admin accounts created successfully');
  }
  catch(error){
    console.error('error creating admin accounts : ' , error)
  }
}

module.exports = { createAdminAccounts }