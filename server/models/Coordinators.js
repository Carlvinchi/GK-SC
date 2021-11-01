// Database Model  for Coordinators
const mongoose = require('mongoose')

const CoordinatorSchema = mongoose.Schema({
    firstName:{type: String},
    lastName:{type:String},
    email:{type:String},
    mobile:{type:String},
    userId:{type:mongoose.Types.ObjectId, ref: 'User', unique:true},
    courseId:{type:mongoose.Types.ObjectId,  ref: 'Course',unique: true},
    courseTitle:{type:String}
},{
    timestamps:true
})


module.exports = mongoose.model('Coordinator', CoordinatorSchema)