const exam = require('../models/Exams')
const mongoose = require('mongoose')

//function to get all courses
const getExamsAll = async(req,res) =>{
    const exams = await exam.find({}).sort({createdAt: -1})
    res.status(200).json(exams)
}
//function to get a course
const getExam = async(req,res) =>{
    const {ide} = req.params
    if(!mongoose.Types.ObjectId.isValid(ide)){
        return res.status(404).json({error: 'No such course'})
    }
   const ex = await exam.findById(ide)

   if(!exam){
    return res.status(404).json({error: 'No such Exams'})
   }
   res.status(200).json(ex)
}
//function to delete a course
const deleteExam = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Exam'})
    }
    const ex = await exam.findOneAndDelete({_id: id})
    if(!exam){
        return res.status(400).json({error:'No such Exam'})
    }
    res.status(200).json(ex)
}
//function to create a course
const createExam = async (req,res) => {
    //console.log(req.body)
    const{Subtitle_id,Exam_Name,Questions,Options,correct_Answers} = req.body
    //add course to db
    try{
        const ex = await exam.create({Subtitle_id,Exam_Name,Questions,Options,correct_Answers})
        res.status(200).json(ex)
    }catch(error){
        res.status(400).json({error: error.message})
    }

}

//function to update a course
const updateExam = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such exam'})
    }
    const ex = await exam.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!exam){
        return res.status(400).json({error:'No such exam'})
    }
    res.status(200).json(ex)
}
const updateAllExams = async (req,res) =>{
    // const {id} = req.params
    
    try {
     
        const ex = await exam.updateMany({_v:0},{
             ...req.body
             
           // $set:{Currency:"usd"}
        })
        res.status(200).json(ex)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

module.exports = {
    getExamsAll,
    getExam,
    deleteExam,
    createExam,
    updateExam,
    updateAllExams
}