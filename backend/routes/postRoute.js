const express = require('express')
const router = express.Router()
const {createPost, getPosts, getPost, updatePost, deletePost} = require('../controllers/postController')

const {protect} = require('../middlewares/userAuthMiddleware')

router.route('/').post(protect, createPost).get(getPosts)
router.route('/:id').get(protect, getPost).put(protect, updatePost).delete(protect, deletePost)

module.exports = router