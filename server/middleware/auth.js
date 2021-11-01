const User = require('../models/Users')

const jwt = require('jsonwebtoken')


const auth = async (req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(500).json({msg:'No Authentication Header'})
    }

    const token = authHeader.split(' ')[1]

    try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)

            req.user = {userId:payload.userId, firstName:payload.firstName}
            next()
    } catch (error) {
        res.status(500).json({msg:'Authentication error'})
        
    }

}

module.exports = auth