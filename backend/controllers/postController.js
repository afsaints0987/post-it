const Posts = require('../models/postModel')
const Users = require('../models/userModel')

// Get Posts
const getPosts = async (req, res) => {
    const posts = await Posts.find()
    res.status(200).json(posts)
}

// Create Post
const createPost = async (req, res) => {
    const {title, body} = req.body

    const user = await Users.findById("64d9faf1b1262f82b15459fd")


    if(!title && !body){
        res.status(400).json({message: 'No Post Created.'})
    }

    const post = await Posts.create({
        title,
        body,
        author: {
            id: user._id,
            username: user.username
        }
    })

    if(post){
        res.status(201).json({
            title: post.title,
            body: post.body,
            author: post.author,
            message: "Post Created!"
        })
    } else {
        res.status(500).json({error:'Something went wrong'})
        return
    }
}

// Get Post


// Update Post


// Delete Post

module.exports = {createPost, getPosts}