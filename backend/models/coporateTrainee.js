const mongoose = require('mongoose')

const Schema = mongoose.Schema

const coporateTraineeSchema = new Schema({
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
    Country: {
        type: String,
        required: false
    },
  
   
    Bio: {
        type: String,
        default: "My Bio",
        required: true
    },
    Watched:{
        type:Array
    },
    Registered_Course:{
        type: Array,
        Course_det:{
            Course_id:{
                type:String
            },
            Course_name:{
                type:String
            },
            Amount_paid:{
                type:Number
            },
            Watched:{
                type:Number,
                default:0,
                required:true
            },
            Progress:{
                type:Number,
                default:0,
                required: true
            },
            IsApproved:{
                default:false,
                type:Boolean,
               
            }
        }
    },
   
    My_Reports:{
        type: Array,
        Reportato:{
            Report_title:{
                type:String
            },
            Report_content:{
                type:String
            }, 
            Report_status:{
                type:String
            }
        }
       
    },
})

module.exports = mongoose.model('Coporate_trainee',coporateTraineeSchema)