//required packages
const bcrypt = require('bcrypt');  //for hashing password
const User = require('../models/user');  //importing models
const { signUpSchema, loginSchema } = require('../helper/validation');  //importing validation

//signup function to register new user
const signUp = async (req, res) => {    //signUp function
    try{
        const { error } = signUpSchema.validate(req.body); //validation
        if (error){
            return res.status(400).json({
                mssg: error.details[0].message
            })
        }

        const { name, email, pass } = req.body; //name, email, pass from models.js

        const userinfo = await User.findOne({ email: email })  //check if email already exists

        if (userinfo) {           //if email already exists
            return res.status(400).json({       //400 is bad request
                mssg:"Email already exists"
            })
        }

        const hashpassword = await bcrypt.hashSync(pass, 10); //hashing password

        const user = await User.create({   //creating new user
            name: name,
            email: email,
            pass: hashpassword
        })

        return res.status(200).json({          //200 is ok
            mssg: "Account created successfully",
            data: { user }
        })
    } catch(error) {
        console.log("Error in signup",error)
    }
}

//login function to login existing user
const login = async (req, res) => {
    try{
        const { error } = loginSchema.validate(req.body); //validation
        if (error){
            return res.status(400).json({
                mssg: error.details[0].message
            })
        }
        const { email, pass } = req.body;

        const userinfo = await User.findOne({ email: email })  //check if email already exists

        if (!userinfo) {           //if email does not found
            return res.status(400).json({       
                mssg:"Email not registered"
            })
        } else if(!bcrypt.compareSync(pass, userinfo.pass)){   //if password is wrong
            return res.status(400).json({       //400 is bad request
                mssg:"wrong password"
            })
        } else{
            userinfo.pass = undefined
            const token = create_token(userinfo)

            return res.status(200).json({
                mssg: "Login successful",
                data: {
                    userinfo,
                    token
                }
            })
        }

    } catch(error) {
        return res.status(500).json({
            mssg: "Internal server error, try again"
        })
    }
}

//userinfo function to get user info from database and attach it to req.user variable in request object of next function
const userinfo = async (req, res) => { 
    try {
        const userinfo = req.user  

        return res.status(200).json({
            mssg: "user info",
            data: { 
                userinfo
             }  
        })
    } catch (error) {
        return res.status(500).json({
            mssg: "Internal server error, try again"
        })
    }
}

//function to create token for user for 24 hours expiry time
const jwt = require('jsonwebtoken')  
const create_token = (user) => {    //function to create token for user for 24 hours expiry time
    const userData = { _id:user._id, email:user.email, role:user.role }
    const expireIn = 60*60*24
    const token = jwt.sign( userData, process.env.JWT_SECRET , {expiresIn: expireIn})
    return { token, expireIn }
}

//exporting functions from this file to other files
module.exports = {
    signUp,
    login,
    userinfo
}