// Controller for Quizzes

const Course = require('../models/Courses')

const courseModule = require('../models/Modules')

 
const Quiz = require('../models/Quiz')
 

const addQuiz = async(req,res)=>{
    try {
        const quiz = await Quiz.create({...req.body})
        res.status(200).json({quiz})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const updateQuiz = async(req,res)=>{
    try {
        const quiz = await Quiz.findByIdAndUpdate({_id:req.params.id},
            req.body,
            { new: true, runValidators: true }
            )

        if(!quiz){
            return res.status(404).json({quiz: 'No quiz found'})
        }

        res.status(200).json({quiz})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const deleteQuiz = async(req,res)=>{
    try {
        const quiz = await Quiz.findByIdAndDelete({_id:req.params.id} )

        if(!quiz){
            return res.status(404).json({quiz: 'No quiz found'})
        }

        res.status(200).json({msg:"Quiz deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const deleteManyQuiz = async(req,res)=>{
    try {
        const quiz = await Quiz.deleteMany({} )

        if(!quiz){
            return res.status(404).json({quiz: 'No quiz found'})
        }

        res.status(200).json({msg:"Quiz deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const getQuiz = async(req,res)=>{
    try {
        const quiz = await Quiz.findById({_id:req.params.id})
        if(!quiz || quiz.length == 0){
            return res.status(404).json({quiz: 'No quiz found'})
        }
        res.status(200).json({quiz})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const getQuizzes = async(req,res)=>{
    try {
        const quiz = await Quiz.find({courseId:req.params.courseId})
        if(!quiz || quiz.length == 0){
            return res.status(404).json({quiz: 'No quizzes found'})
        }
        res.status(200).json({quiz})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}


module.exports = {
    addQuiz,
    updateQuiz,
    deleteQuiz,
    getQuiz,
    getQuizzes,
    deleteManyQuiz
}
