const mongoose = require('mongoose')

const Schema = mongoose.Schema

const guestSchema = new Schema({
    Country: {
        type: String,
        required: true
    }
   
})

module.exports = mongoose.model('Guest',guestSchema)