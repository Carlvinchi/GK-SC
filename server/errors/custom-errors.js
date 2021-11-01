

class CustomError extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
    
}

const creatCustomError = (message,statusCode) => {
    return new CustomError(message,statusCode)
}

module.exports = {creatCustomError,CustomError}