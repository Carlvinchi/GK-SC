// Database Model  for Courses

const mongoose = require('mongoose')

const CourseSchema = mongoose.Schema({
    courseTitle:{
        type: String,
        require:true
        
    }
},{
    timestamps:true
})



module.exports = mongoose.model('Course',CourseSchema)