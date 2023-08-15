const express = require('express')
const router = express.Router()
const {createPost, getPosts, getPost, updatePost, deletePost} = require('../controllers/postController')

router.route('/').post(createPost).get(getPosts)
router.route('/:id').get(getPost).put(updatePost).delete(deletePost)

module.exports = router