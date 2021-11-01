// Database Model  for Users

const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

require('dotenv').config()


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide first name'],
        maxlength: 50,
        minlength: 3,
        trim:true
      },
    lastName: {
        type: String,
        required: [true, 'Please provide last name'],
        maxlength: 50,
        minlength: 3,
        trim: true
      },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please provide a valid email',
        ],
        unique: true,
      },
    mobile: {
        type: String,
        required: [true, 'Please provide number'],
        maxlength: 16,
        minlength: 10,
        unique: true,
        trim: true
      },
    address: {
        type: String,
        required: [true, 'Please provide address']
      },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 8
      },
    status: {
        type: String,
        default: 'normal'
      },
    isEnrolled:{
      type:Boolean,
      default: false
    }
}, {timestamps:true})

UserSchema.pre('save', async function(){

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

})

UserSchema.methods.createJWT = function(){
  return jwt.sign({userId:this._id, firstName:this.firstName},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_LIFETIME
  })
}

UserSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

UserSchema.methods.hashNewPassord = async function(newPassword){
  const salt = await bcrypt.genSalt(10)
 const newPass = await bcrypt.hash(newPassword, salt)
 return newPass

}

module.exports = mongoose.model('User',UserSchema)