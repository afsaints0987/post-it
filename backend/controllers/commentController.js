const Comment = require("../models/commentModel")
const Post = require("../models/postModel")
const User = require("../models/userModel")

const getComments = async (req, res) => {
    res.send({message: "This is all the comments from the post"})
}

const createComment = async (req, res) => {
     const user = await User.findById(req.user.id)
     const post = await Post.findById(req.params.id)
     const {text} = req.body

     if(!text){
        res.status(400).json({message: "Please write a comment"})
     }

     const comment = await Comment.create({
        text,
        author: {
            id: user._id,
            username: user.username
        }
     })

     if(comment){
        post.comments.push({
            _id: comment.id,
            text: comment.text,
            author: comment.author.username
        })

        await post.save();

        res.status(200).json({
            _id: comment.id,
            text: comment.text,
            author: comment.author.username,
            message: "Comment Saved!"
        })
     } else {
        res.status(400).json({message: "Creating Comment Failed"})
        return
     }
}

const updateComment = async (req, res) => {
    res.send({message: "This is to update comment"})
}

const deleteComment = async (req, res) => {
    res.send({message: "This is to delete the comment"})
}

module.exports = {getComments, createComment, updateComment, deleteComment}

