// Database Model  for Course Modules

const mongoose = require('mongoose')

const ModuleSchema = mongoose.Schema({
    moduleTitle:{
        type: String,
        require:true
    }, 
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
      },
      moduleLink: {
        type: String,
       
      }
},{
    timestamps:true
})



module.exports = mongoose.model('Module',ModuleSchema)