const express = require('express')
const router = express.Router()
const {loginUser, registerUser, getUser} = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/:id', getUser)

module.exports = router
