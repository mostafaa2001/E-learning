const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema({
    Currency: {
        type: String,
        required: false
    },
    Course_subject: {
        type: String,
        required: true
    },
    Course_excrcise: {
        type: Number,
        default: 0,
        required: false
    },
    Course_duration: {
        type: Number,
        default: 0,
        required: true
    },
    Course_rating: {

        type: Array,

        Rate: {

            type: Number,

            required: false

        },

        RaterType: {

            type: String,

            required: false



        },

        RaterId: {

            type: String,

            required: false



        }

    },

    Course_overAllRate: {

        type: Number,
        default: 0,
        required: false

    },

    Course_NumberOfRatings: {

        type: Number,
        default: 0,
        required: false

    },
    Course_price: {
        type: Number,
        required: true
    },
    Course_instructor_id: {
        type: String,
        required: true
    },
    Course_instructor_name: {
        type: String,
        required: true
    },

    Preview_link: {
        type: String,
        required: true
    },
    Course_description: {
        type: String,
        required: true
    },
    Course_photo: {
        type: String,
        required: false
    },
       Course_photo: {
        type: String,
        required: false
    },
    Reviews: {
        type: Array,
        Reviewer: {
            ReviewerID: {
                type: String
            },
            ReviewerName: {
                type: String
            },
            ReviewerReview: {
                type: String
            }
        }
    },
    IReviews: {
        type: Array,
        Reviewer: {
            ReviewerID: {
                type: String
            },
            ReviewerName: {
                type: String
            },
            ReviewerReview: {
                type: String
            }
        }
    },
    No_subtitles:{
        type:Number,
        required:true,
        default:0
    },
    Enrolled:{
        type:Number,
        default:0
    }

}, { timestamps: true })

module.exports = mongoose.model('Course', courseSchema)