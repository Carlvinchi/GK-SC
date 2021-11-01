// Database Model  for Reset Password

const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

const cryp = require('crypto')

require('dotenv').config()


const ResetSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        
        trim:true
      },
    resetCode: {
        type: String,
      },
    expires: {
        type: Date,
       
      }
    
    
}, {timestamps:true})

ResetSchema.pre('save', async function(){

    this.resetCode = await cryp.randomBytes(10).toString('hex')
    const date = new Date();
    date.setDate(date.getDate() + 1);
    this.expires = date

})


ResetSchema.methods.hashNewPassord = async function(newPassword){
  const salt = await bcrypt.genSalt(10)
 const newPass = await bcrypt.hash(newPassword, salt)
 return newPass

}

ResetSchema.methods.checkExpiry = async function(expires){
    const date = new Date()
    date.getDate()

    if(date < expires){
        return true
    }

    return false
  
  }


module.exports = mongoose.model('Reset',ResetSchema)