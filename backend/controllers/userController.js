const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const {generateToken} = require('../utils/generateToken')


const registerUser = async (req, res) => {
    const {username, password, email} = req.body
    
    if(!username || !password || !email) {
        res.status(400).json({message: 'Please complete the form'})
        return
    }

    // If User already exist

    const userExist = await User.findOne({username})
    if(userExist){
        res.status(400).json({message: 'Username already exist'})
        return
    }

    // Hash the Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Register / Create User

    const user = await User.create({
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
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        generateToken(user._id, res),
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            message: 'User Login Successfully!'
        })
    } else {
        res.status(400).json({message: "Invalid Credentials please try again"})
    }
    return
}

const getUser = async (req, res) => {
    const {_id, username, email} = await User.findById(req.params.id)

    res.status(200).json({
        id: _id,
        username,
        email
    })
}

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        console.error("Error in getMe:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const logoutUser = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: 'Logged Out Successfully!'})
}

module.exports = {
    registerUser, loginUser, getUser, logoutUser, getMe
}