// Controller for Users

const User = require('../models/Users')

const Reset = require('../models/Reset')


const createUser =  async(req,res ) =>{
    
 try {
        const user = await User.create({...req.body})
        
        const token = user.createJWT()
         
        res.status(200).json({user:{name:user.firstName}, token})
        
    } catch (error) {
        res.status(500).json({msg: "Something went wrong, server error"})
    }
    
}

const login = async(req, res) =>{
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
          return  res.status(404).json({msg: "There is no such user"})

        }
        
        const isPasswordValid = await user.comparePassword(password)
        if(!isPasswordValid){
           return res.status(400).json({msg: "Invalid credentials"})
        }
        
        const token = user.createJWT()
          
        res.status(200).json({user:{name:user.firstName}, token})
        
    } catch (error) {
        res.status(500).json({msg: "Something went wrong, server error"})
    }
}


const getAllUsers = async(req,res ) =>{

    try {
        const user = await User.find({}).sort({createdAt:-1})
        res.status(200).json({users: user})
    } catch (error) {
        return  res.status(500).json({msg: 'Something went wrong'})
    }
}



const getUser = async(req,res ) =>{
    try {
        const user = await User.find({_id:req.params.id})
        if(!user || user.length == 0){
            return  res.status(404).json({msg: "There is no such user"})
        }
        res.status(200).json({user})
    } catch (error) {
        return  res.status(500).json({msg: 'Something went wrong'})
    }
    
}

const updateUser = async(req,res ) =>{
    try {
        const user = await User.findByIdAndUpdate(
            { _id:req.params.id },
            req.body,
            { new: true, runValidators: true }
          )
        if(!user){
            return  res.status(404).json({msg: "There is no such user"})
        }
        res.status(200).json({user})
    } catch (error) {
        return  res.status(500).json({msg: 'Something went wrong'})
    }
}


const changePassword = async(req,res ) =>{
    try {
        const {oldPassword, newPassword} = req.body

        const user = await User.findOne({_id: req.user.userId})
        if(!user){
            return  res.status(404).json({msg: "There is no such user"})
        }

        const isOldPassValid = await user.comparePassword(oldPassword)
        if(!isOldPassValid){
           return res.status(400).json({msg: "Invalid old password"})
        }
        const hashNewPass = await user.hashNewPassord(newPassword)

        console.log(hashNewPass)
        const updatePass = await User.findByIdAndUpdate(
            { _id:req.user.userId },
            {password: hashNewPass},
            { new: true, runValidators: true }
        ) 

        res.status(200).json({msg:'Password changed'})
    } catch (error) {
        console.log(error)
        return  res.status(500).json({msg: 'Something went wrong'})
    }
}

const deleteUser = async(req,res ) =>{
    try {
        const user = await User.findOneAndDelete({_id:req.params.id})
        if(!user){
            return  res.status(404).json({msg: "There is no such user"})
        }
        res.status(200).json({msg: "user deleted"})
    } catch (error) {
        return  res.status(500).json({msg: 'Something went wrong'})
    }
}

const deleteManyUsers = async(req,res ) =>{
    try {
        const user = await User.deleteMany({})
        if(!user){
            return  res.status(404).json({msg: "There is no such user"})
        }
        res.status(200).json({msg: "user deleted"})
    } catch (error) {
        return  res.status(500).json({msg: 'Something went wrong'})
    }
}

const forgotPassword = async(req,res ) =>{
    try {
        const user = await User.findOne({email: req.body.userEmail})
        if(!user){
            return  res.status(404).json({msg: "There is no such user"})
        }

        const reset = await Reset.create({userEmail:req.body.userEmail})

        //Will put email code here

        res.status(200).json({reset})
        
    } catch (error) {
        
        return  res.status(500).json({msg: 'Something went wrong'})
    }
}

const resetPassword = async(req,res ) =>{
    try {
        const {resetCode,userEmail, newPassword} = req.body

        const reset = await Reset.findOne({resetCode:resetCode})
        if(!reset){
            return  res.status(404).json({msg: "Invalid reset code"})
        }

        const isResetCodeValid = await reset.checkExpiry(reset.expires)
        if(!isResetCodeValid){
            
           return res.status(400).json({msg: "code expired"})
        }

        const hashNewPass = await reset.hashNewPassord(newPassword)

        const updatePass = await User.findOneAndUpdate(
            { email:userEmail },
            {password: hashNewPass},
            { new: true, runValidators: true }
        )

        res.status(200).json({msg:'Password Reset'})
    } catch (error) {
        
        return  res.status(500).json({msg: 'Something went wrong'})
    }
}



module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login,
    changePassword,
    forgotPassword,
    resetPassword,
    deleteManyUsers
}