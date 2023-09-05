const express = require('express')
const router = express.Router()
const {createPost, getPosts, getPost, updatePost, deletePost} = require('../controllers/postController')
const {getComments, createComment, updateComment, deleteComment} = require('../controllers/commentController')

const {protect} = require('../middlewares/userAuthMiddleware')

router.route('/').post(protect, createPost).get(getPosts)
router.route('/:id').get(protect, getPost).put(protect, updatePost).delete(protect, deletePost)
router.get('/:id/comments', getComments)
router.route('/:id/comment').post(protect, createComment).put(updateComment).delete(deleteComment)

module.exports = router