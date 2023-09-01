const mongoose = require('mongoose')
const Comment = require('../models/commentModel')

const postSchema = mongoose.Schema({
    title: {
        type : String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId ,
        ref:'User',
    }],
    comments: [Comment.schema]
}, {timestamps: true} )

const Post = mongoose.model('Post', postSchema)

module.exports = Post;