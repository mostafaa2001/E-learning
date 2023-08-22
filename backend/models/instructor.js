const mongoose = require('mongoose')
const Schema = mongoose.Schema

const instructorSchema = new Schema({
    // Country: {
    //     type: String,
    //     // required: true
    // },
    Fname: {
        type: String,
         required: true
    },
    Lname: {
        type: String,
         required: true
    },
    Email: {
        type: String,
         required: true
    },
    Password: {
        type: String,
        required: true
    },
  
  
    Bio: {
        type: String,
        default: "My Bio",
        // required: true
    },
   
    rating: {

        type : Array,

        Rate:{

         type: Number,

         required :false

        },

        RaterType:{

         type: String,

         required :false

 

        },

        RaterId:{

         type: String,

         required :false

 

        }

    },

    numberofratings: {

        type: Number,
        default:0,
        required: false

    },

 

  overAllRate :{

        type : Number,
        default:0,
        required: false

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
    Wallet:{
        type:Number,
        default:0
    }
  
})

module.exports = mongoose.model('Instructor',instructorSchema)