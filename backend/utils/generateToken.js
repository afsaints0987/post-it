const jwt = require('jsonwebtoken')

const generateToken = (res, id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:'15d'
    })
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000
    })
}

module.exports = {generateToken}