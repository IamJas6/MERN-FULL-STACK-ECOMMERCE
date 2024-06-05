//required packages
const jwt = require('jsonwebtoken')
const User = require('../models/user')

//auth middleware function to verify token and fetch user info from database and attach it to req.user variable in request object of next function
const authMiddleware = async (req, res, next) => {  
    try {
        const Authorization = req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null  //to get token from header or null if not found in header 
        if(!Authorization) {
            return res.status(401).json({
                msg: "No token provided"
            })
        }

        const verify_token = await jwt.verify(Authorization, process.env.JWT_SECRET)  //to verify token with secret key from .env file 
        
        const userId = verify_token._id
        const userinfo = await User.findById(userId)  //to get user info from database using user id

         if(userinfo) {
            req.user = userinfo      //to attach user info to req.user
            req.user.pass = undefined
            next()
        } else {
            return res.status(401).json({
                mssg: 'Unauthorized user'
            })
        }

    } catch (error) {
        return res.status(500).json({
            mssg: 'Internal server error, try once again'
        })
    }
}


const authAdminMiddleware = async (req, res, next) => {  
    try {
        const Authorization = req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null  //to get token from header or null if not found in header 
        if(!Authorization) {
            return res.status(401).json({
                msg: "No token provided"
            })
        }

        const verify_token = await jwt.verify(Authorization, process.env.JWT_SECRET)  //to verify token with secret key from .env file 
        
        const userId = verify_token._id
        const userinfo = await User.findById(userId)  //to get user info from database using user id

        if(userinfo && userinfo.role == 1) {
            req.user = userinfo      //to attach user info to req.user
            req.user.pass = undefined
            next()
        } else {
            return res.status(401).json({
                mssg: 'Unauthorized user'
            })
        }

    } catch (error) {
        return res.status(500).json({
            mssg: 'Internal server error, try once again'
        })
    }
}

//exporting function
module.exports = {
    authMiddleware,
    authAdminMiddleware
}