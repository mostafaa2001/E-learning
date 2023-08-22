const Course = require('../models/courseModel')
const mongoose = require('mongoose')

//function to get all courses
const getCourses = async(req,res) =>{
    const courses = await Course.find({}).sort({createdAt: -1})
    res.status(200).json(courses)
}
//function to get a course
const getCourse = async(req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such course'})
    }
   const course = await Course.findById(id)

   if(!Course){
    return res.status(404).json({error: 'No such course'})
   }
   res.status(200).json(course)
}
//function to get last 
const getlastCourse = async(req,res) =>{
    const {idi} = req.params
    const lastcourse = await Course.find().sort({_id:-1}).limit(1);
    res.status(200).json(lastcourse)
}
//function to delete a course
const deleteCourse = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such course'})
    }
    const course = await Course.findOneAndDelete({_id: id})
    if(!Course){
        return res.status(400).json({error:'No such course'})
    }
    res.status(200).json(course)
}
//function to create a course
const createCourse = async (req,res) => {
    //console.log(req.body)
    const{Currency,Course_subject,Course_excrcise,Course_title, Course_duration,Course_rating,Course_price, Course_instructor_id, Course_instructor_name,Preview_link , Course_description , Course_photo} = req.body
    //add course to db
    try{
        const course = await Course.create({Currency,Course_subject,Course_excrcise,Course_title, Course_duration,Course_rating,Course_price, Course_instructor_id, Course_instructor_name,Preview_link , Course_description , Course_photo})
        res.status(200).json(course)
    }catch(error){
        res.status(400).json({error: error.message})
    }

}

//function to update a course
const updateCourse = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such course'})
    }
    const course = await Course.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!Course){
        return res.status(400).json({error:'No such course'})
    }
    res.status(200).json(course)
}
const updateAllCourse = async (req,res) =>{
    // const {id} = req.params
    
    try {
     
        const course = await Course.updateMany({_v:0},{
             ...req.body
             
           // $set:{Currency:"usd"}
        })
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

module.exports = {
    createCourse,
    getCourses,
    getCourse,
    deleteCourse,
    updateCourse,
    updateAllCourse,
    getlastCourse
}