// Controller for Modules

const Course = require('../models/Courses')

const courseModule = require('../models/Modules')


const addModule = async(req,res)=>{
    try {
        const module = await courseModule.create({...req.body})
        res.status(200).json({module})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    } 
}

const updateModule = async(req,res)=>{
    try {
        const module = await courseModule.findByIdAndUpdate({_id:req.params.id},
            req.body,
            { new: true, runValidators: true }
            )

        if(!module){
            return res.status(404).json({module: 'No module found'})
        }

        res.status(200).json({module})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const deleteModule = async(req,res)=>{
    try {
        const module = await courseModule.findByIdAndDelete({_id:req.params.id} )

        if(!module){
            return res.status(404).json({module: 'No module found'})
        }

        res.status(200).json({msg:"Module deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const deleteManyModule = async(req,res)=>{
    try {
        const module = await courseModule.deleteMany({} )

        if(!module){
            return res.status(404).json({module: 'No module found'})
        }

        res.status(200).json({msg:"Module deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const getModule = async(req,res)=>{
    try {
        const module = await courseModule.findById({_id:req.params.id})
        if(!module || module.length == 0){
            return res.status(404).json({module: 'No module found'})
        }
        res.status(200).json({module})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}

const getModules = async(req,res)=>{
    try {
        const module = await courseModule.find({courseId:req.params.courseId})
        if(!module || module.length == 0){
            return res.status(404).json({modules: 'No modules found'})
        }
        res.status(200).json({module})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something went wrong"})
    }
}


module.exports = {
    addModule,
    updateModule,
    deleteModule,
    getModule,
    getModules,
    deleteManyModule
}
