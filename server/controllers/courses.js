// Controller for Courses

const Course = require('../models/Courses')

const addCourse = async(req,res) => {
    try {
        const course = await Course.create({...req.body})
        res.status(200).json({course})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
    
}

const updateCourse = async(req,res) => {
    try {
        const course = await Course.findByIdAndUpdate({_id:req.params.id},
            req.body,
            { new: true, runValidators: true }
            )

        if(!course){
            return res.status(404).json({courses: 'No course found'})
        }

        res.status(200).json({course})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const deleteCourse = async(req,res) => {
    try {
        const course = await Course.findByIdAndDelete({_id:req.params.id} )

        if(!course){
            return res.status(404).json({courses: 'No course found'})
        }

        res.status(200).json({msg:"Course deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const deleteManyCourse = async(req,res) => {
    try {
        const course = await Course.deleteMany({} )

        if(!course){
            return res.status(404).json({courses: 'No course found'})
        }

        res.status(200).json({msg:"Course deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const getCourses = async(req,res) => {
    try {
        const course = await Course.find({}).sort({createdAt:-1})
        if(!course || course.length == 0){
            return res.status(200).json({courses: 'No courses'})
        }
        res.status(200).json({courses:course})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const getCourse = async(req,res) => {
    try {
        const course = await Course.findById({_id:req.params.id})
        if(!course || course.length == 0){
            return res.status(404).json({courses: 'No course found'})
        }
        res.status(200).json({course})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

module.exports = {
    addCourse,
    updateCourse,
    deleteCourse,
    getCourse,
    getCourses,
    deleteManyCourse
}


