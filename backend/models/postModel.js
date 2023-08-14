const mongoose = require('mongoose')


const PostModel = mongoose.Schema({
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
            ref: 'Users'
        },
        username: String
    }
}, {timestamps: true} )

const Post = mongoose.model('Posts', PostModel)

module.exports = Post;