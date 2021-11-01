// Controller for Coordinators

const User = require('../models/Users')

const Coordinator = require('../models/Coordinators')

const Course = require('../models/Courses')

 

const addCoordinator = async(req,res)=>{
    try {

        const {userId, courseId} = req.body

        const user = await User.findByIdAndUpdate({_id:userId},
            {status:'coordinator'},{ new: true, runValidators: true }
            )
            if(!user){
                return  res.status(404).json({msg: "There is no such user, coordinator can't be added"})
      
              }
        const course = await Course.findById({_id:courseId})
        if(!course){
            return  res.status(404).json({msg: "There is no such course, coordinator can't be added"})
  
          }
        const coordinator = await Coordinator.create({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            userId: userId,
            courseId: courseId,
            courseTitle:course.courseTitle
        })
        res.status(200).json({coordinator})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
} 

const updateCoordinator = async(req,res)=>{
    try {


        const coordinator = await Coordinator.findByIdAndUpdate({_id:req.params.id},
            req.body,{ new: true, runValidators: true }
            )
            if(!coordinator){
                return  res.status(404).json({msg: "There is no such user, coordinator can't be added"})
      
              }
        
        
        res.status(200).json({coordinator})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const deleteCoordinator = async(req,res)=>{
    try {
        const coordinator = await Coordinator.findByIdAndDelete({_id:req.params.id} )

        if(!coordinator){
            return res.status(404).json({course: 'Not found'})
        }

        res.status(200).json({msg:"Coordinator deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const deleteManyCoordinator = async(req,res)=>{
    try {
        const coordinator = await Coordinator.deleteMany({} )

        if(!coordinator){
            return res.status(404).json({course: 'Not found'})
        }

        res.status(200).json({msg:"Coordinator deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const getCoordinator = async(req,res)=>{
    try {
        const coordinator = await Coordinator.findById({_id:req.params.id})
        if(!coordinator || coordinator.length == 0){
            return res.status(200).json({coordinators: 'No Coordinatos'})
        }
        res.status(200).json({coordinator:coordinator})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const getCoordinators = async(req,res)=>{
    try {
        const coordinator = await Coordinator.find({}).sort({createdAt:-1})
        if(!coordinator || coordinator.length == 0){
            return res.status(200).json({coordinators: 'No Coordinatos'})
        }
        res.status(200).json({coordinators:coordinator})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}


module.exports = {
    addCoordinator,
    updateCoordinator,
    deleteCoordinator,
    getCoordinator,
    getCoordinators,
    deleteManyCoordinator
}
