// Database Model  for Quizzes
 
const mongoose = require('mongoose')

const QuizSchema = mongoose.Schema({
    courseId:{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    },
    quizLink:{
        type:String
    },
    score:{
        type:Number
    }
},{
    timestamps:true
})


module.exports = mongoose.model('Quiz', QuizSchema)