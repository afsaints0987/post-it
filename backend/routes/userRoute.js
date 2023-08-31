const express = require('express')
const router = express.Router()
const {loginUser, registerUser, getUser, logoutUser, getMe} = require('../controllers/userController')

const {protect} = require('../middlewares/userAuthMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/me', protect, getMe)
router.get('/:id', getUser)

module.exports = router
