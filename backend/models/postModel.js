const mongoose = require('mongoose')

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
    comments: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        },
        text: String,
        author: String
    }]
}, {timestamps: true} )

const Post = mongoose.model('Post', postSchema)

module.exports = Post;