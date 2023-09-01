const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = async (req, res, next) => {
    let token

    token = req.cookies.jwt

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch(err) {
            console.error(err)
            res.status(401).json({
                message: "Not authorized"
            })
        }
    } else {
        res.status(401).json({
            message:"No token provided",
        })
    }

}

module.exports = {protect}