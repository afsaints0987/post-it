const express = require('express')
const router = express.Router()
const {loginUser, registerUser, getUser, logoutUser} = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/:id', getUser)

module.exports = router
