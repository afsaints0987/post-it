const jwt = require('jsonwebtoken')
const Users = require('../models/userModel')

const protect = async (req, res, next) => {
    let token;

    if(req.header.authorization && req.headers.authorizaton.startsWith('Bearer')){
        try {
            // get the token from header
            token = req.headers.authorization.split(' ')[1]

            // verify token
            const decodedToken = await jwt.verify(token,'secret');

            console.log(decodedToken)

            req.user = await Users.findById(decodedToken.id).select('-password')

            next()
        } catch(err) {
            console.error(err)
            res.status(401).json({
                message: "Not authorized to access this route"
            })
        }
    }
    if(!token){
        res.status(401).json({
            message:"No token provided",
        })
    }
}

module.exports = {protect}