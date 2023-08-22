const mongoose = require('mongoose')

const sub = require('../models/Subtitle')
//function to get all instructors

//function to create a instructor
const createSubtitle = async (req,res) => {
    const{ CourseId ,Name ,  Exercises ,  Hours } = req.body
    //add course to db
    try{
        const subtitle = await sub.create({ CourseId ,Name ,  Exercises ,  Hours})
        console.log(subtitle)
        res.status(200).json(subtitle)
    }catch(error){
        res.status(400).json({error: error.message})
    }

}
const updateSub = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such subtitle'})
    }
    const subtitle = await sub.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!subtitle){
        return res.status(400).json({error:'No such subtitle'})
    }
    res.status(200).json(subtitle)
}

const getsubtitles = async(req,res) =>{
    console.log('no')
    const subtitles = await sub.find({}).sort({createdAt: -1})
    res.status(200).json(subtitles)
}

module.exports = {
    createSubtitle,
    updateSub,
    getsubtitles
}