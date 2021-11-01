const {customError, CustomError} = require('../errors/custom-errors')

const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(500).json({message:'Something went wrong'})
}

module.exports = errorHandlerMiddleware