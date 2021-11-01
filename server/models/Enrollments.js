// Database Model  for Enrollments

const mongoose = require('mongoose')
 
const EnrollmentSchema = mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId, ref: 'User'},
    studentName:{type:String},
    studentMobile:{type:String},
    studentEmail:{type:String},
    courseId:{type:mongoose.Types.ObjectId, ref: 'Course'},
    coordinatorId:{type:mongoose.Types.ObjectId, ref:'Coordinator'},
    courseTitle:{type:String},
    coordinatorName:{type:String},
    courseScore:{type:Number,default:0.00},
    progress:{type:Number,default:0.00},
    dateEnrolled:{type:Date},
    dateCompleted:{type:Date}
    

},{
    timestamps:true
})


module.exports = mongoose.model('Enrollment',EnrollmentSchema)