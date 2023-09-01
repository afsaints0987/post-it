const Post = require('../models/postModel')
const User = require('../models/userModel')

// Get Posts
const getPosts = async (req, res) => {
    const posts = await Post.find()
    res.status(200).json(posts)
}

// Create Post
const createPost = async (req, res) => {
    const user = await User.findById(req.user.id)
    console.log(user)
    const {title, body} = req.body

    if(!title && !body){
        res.status(400).json({message: 'No Post Created.'})
    }

    const post = await Post.create({
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
    const post = await Post.findById(req.params.id);
    res.status(200).json(post)
}

// Update Post
const updatePost = async (req, res) => {
    const updatedPostId = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json({
        updatedPostId,
        message: "Post Updated!"
    })
}


// Delete Post
const deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id)
    res.status(200).json({message: `Post ${req.params.id} Successfully Deleted!`})
}

module.exports = {createPost, getPosts, getPost, updatePost, deletePost}