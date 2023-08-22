const mongoose = require('mongoose')
const { schema } = require('./courseModel')

const Schema = mongoose.Schema

const SubtitleSchema = new Schema({
    CourseId: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Exercises: {
        type: String,
        required: false
    },
    duration: {
        type: Number,
        required: false
    },
    Link: {
        type: String,
        required: false
    },



})


module.exports = mongoose.model('Subtitle', SubtitleSchema)
