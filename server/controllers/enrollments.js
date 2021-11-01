// Controller for Enrollments

const User = require('../models/Users')

const Coordinator = require('../models/Coordinators')

const Course = require('../models/Courses')

const Enrollment = require('../models/Enrollments')



const addEnrollment = async(req,res)=>{
    try {

        const {userId, courseId} = req.body

        const user = await User.findOneAndUpdate({_id:userId,isEnrolled:false},
            {status:'student', isEnrolled:true},{ new: true, runValidators: true }
            )
            if(!user){
                return  res.status(404).json({msg: "Can't be enrolled"})
      
              }
            
        const course = await Course.findById({_id:courseId})
        if(!course){
            return  res.status(404).json({msg: "There is no such course,can't be enrolled"})
  
          }
       const coordinator = await Coordinator.find({courseId:courseId})
       
        const enrollment = await Enrollment.create({
            userId: userId,
            studentName: user.firstName+" "+user.lastName,
            studentMobile: user.mobile,
            studentEmail: user.email,
            courseId: courseId,
            coordinatorId: coordinator[0]._id,
            courseTitle:coordinator[0].courseTitle,
            coordinatorName: coordinator[0].firstName+" "+coordinator[0].lastName,
            dateEnrolled: Date.now()
        })
        res.status(200).json({enrollment})
        
       // res.status(200).json({coordinator})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const updateEnrollment = async(req,res)=>{
    try {


        const enrollment = await Enrollment.findByIdAndUpdate({_id:req.params.id},
            req.body,{ new: true, runValidators: true }
            )
            if(!enrollment){
                return  res.status(404).json({msg: "There is no such enrollment"})
      
              }
        
        
        res.status(200).json({enrollment})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const updateEnrollmentScore = async(req,res)=>{
    try {
        const {userId,enrollmentId, score} = req.body

        const user = await User.findByIdAndUpdate({_id:userId},
            {isEnrolled:false},{ new: true, runValidators: true }
            )

        const enrollment = await Enrollment.findByIdAndUpdate({_id:enrollmentId},
            {courseScore: score, progress: 100, dateCompleted: Date.now()},
            { new: true, runValidators: true }
            )
            if(!enrollment){
                return  res.status(404).json({msg: "There is no such enrollment"})
      
              }
        
        
        res.status(200).json({enrollment})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const deleteEnrollment = async(req,res)=>{
    try {
        const enrollment = await Enrollment.findByIdAndDelete({_id:req.params.id} )

        if(!enrollment){
            return res.status(404).json({course: 'Not found'})
        }

        res.status(200).json({msg:"Enrollment deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
} 

const deleteManyEnrollment = async(req,res)=>{
    try {
        const enrollment = await Enrollment.deleteMany({} )

        if(!enrollment){
            return res.status(404).json({course: 'Not found'})
        }

        res.status(200).json({msg:"Enrollment deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const getEnrollment = async(req,res)=>{
    try {
        const enrollment = await Enrollment.findById({_id:req.params.id})

        if(!enrollment){
            return res.status(404).json({enrollmet: 'Not found'})
        }

        res.status(200).json({enrollments:enrollment})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const getEnrollments = async(req,res)=>{
    try {
        const enrollment = await Enrollment.find({}).sort({createdAt:-1})

        if(!enrollment){
            return res.status(404).json({enrollment: 'Not found'})
        }

        res.status(200).json({enrollments:enrollment})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}


module.exports = {
    addEnrollment,
    updateEnrollment,
    deleteEnrollment,
    getEnrollment,
    getEnrollments,
    deleteManyEnrollment,
    updateEnrollmentScore
}
