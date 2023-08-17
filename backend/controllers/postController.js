const Posts = require('../models/postModel')
const Users = require('../models/userModel')

// Get Posts
const getPosts = async (req, res) => {
    const posts = await Posts.find()
    res.status(200).json(posts)
}

// Create Post
const createPost = async (req, res) => {
    const user = await Users.findById(req.user.id)
    const {title, body} = req.body

    console.log(user)


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
const getPost = async (req, res) => {
    const post = await Posts.findById(req.params.id);
    res.status(200).json(post)
}

// Update Post
const updatePost = async (req, res) => {
    const updatedPostId = await Posts.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json({
        updatedPostId,
        message: "Post Updated!"
    })
}


// Delete Post
const deletePost = async (req, res) => {
    await Posts.findByIdAndDelete(req.params.id)
    res.status(200).json({message: `Post ${req.params.id} Successfully Deleted!`})
}

module.exports = {createPost, getPosts, getPost, updatePost, deletePost}