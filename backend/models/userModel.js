const mongoose = require('mongoose')
const Profile = require('./profileModel')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    profile: [Profile.schema]
}, {timestamps: true})

const User = mongoose.model('User', UserSchema)
module.exports = User