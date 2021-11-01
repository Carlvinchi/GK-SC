// Router  for Users

const express = require('express')

const router = express.Router()

const authenticator = require('../middleware/auth')

const {getAllUsers,getUser,createUser,updateUser,
    deleteUser,login,changePassword, forgotPassword,resetPassword, deleteManyUsers
} 
= require('../controllers/users')

router.route('/').get(authenticator, getAllUsers)

router.delete('/',authenticator, deleteManyUsers)

router.post('/register',createUser)

router.post('/login',login)

router.patch('/update/:id',authenticator,updateUser)

router.patch('/change-password',authenticator,changePassword)

router.post('/forgot-password',forgotPassword)

router.patch('/reset-password',resetPassword)

router.route('/:id').get(authenticator,getUser).delete(authenticator,deleteUser)

module.exports = router  