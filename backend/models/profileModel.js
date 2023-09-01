const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId 
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    bio: String,
    image: String
},{timestamps: true})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile