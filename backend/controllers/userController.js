const Users = require('../models/userModel')
const bcrypt = require('bcryptjs')


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

module.exports = {
    registerUser, loginUser
}