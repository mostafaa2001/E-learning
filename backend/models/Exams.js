const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ExamsSchema = new Schema({
    Subtitle_id: {
        type: String,
        required: true
    },
    Exam_Name: {
        type: String,
        required: true
    },
    Questions: {
        type: Array,
        required: true
    },
    Options: {
        type: Array,
        required: true,
        items:{
            type:Array,
            required: true,
        }
    },
    correct_Answers: {
        type: Array,
        required: true
    },
}, {timestamps:true})

module.exports = mongoose.model('Exams',ExamsSchema)