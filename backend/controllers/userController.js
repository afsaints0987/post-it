const Users = require('../models/userModel')
const bcrypt = require('bcryptjs')
const {generateToken} = require('../utils/generateToken')


const registerUser = async (req, res) => {
    const {username, password, email} = req.body
    
    if(!username || !password || !email) {
        res.status(400).json({message: 'Please complete the form'})
        return
    }

    // If User already exist

    const userExist = await Users.findOne({username})
    if(userExist){
        res.status(400).json({message: 'Username already exist'})
        return
    }

    // Hash the Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Register / Create User

    const user = await Users.create({
        username,
        email,
        password: hashedPassword
    })

    if(user){
        generateToken(res, user._id),
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            message: 'User Registered Successfully!'
        })
    } else {
        res.status(400).json({message: 'User Registration Failed'})
        return
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body

    // Check if User is existed
    const user = await Users.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        generateToken(res, user._id),
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            message: 'User Login Successfully!'
        })
    } else {
        res.status(400).json({message: "Invalid Credentials please try again"})
    }
}

const getUser = async (req, res) => {
    const {_id, username, email} = await Users.findById(req.params.id)

    res.status(200).json({
        id: _id,
        username,
        email
    })
}

const logoutUser = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: 'Logged Out Successfully!'})
}

module.exports = {
    registerUser, loginUser, getUser, logoutUser
}