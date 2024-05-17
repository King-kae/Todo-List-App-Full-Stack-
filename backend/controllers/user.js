const User = require('../models/userModel')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const maxAge = 3 * 24 * 60 * 60;


require('../Auth/auth') // Middleware for authentication and authorization


const signup = async(req, res, next) => {
    passport.authenticate('signup', { session: false }, (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (info) {
            return res.status(400).json({ message: info.message })
        }
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET_KEY, {
            expiresIn: '8h'
        })
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
          });
        // console.log(user)
        return res.status(201).json({ 
            success: true,
            data: user, token,
            message: 'User created successfully' 
        })
    })(req, res, next)
}

const login = async(req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try{
            if (err) {
                return next(err)
            }
            if (info) {
                return res.status(400).json({ message: info.message })
            }
            req.login(user, { session: false},
                async (error) => {
                    if (error) return next(error)
                
                    const body = { _id: user._id, username: user.username }
                    const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY, { expiresIn: '8h'})
                    console.log(token)
                    res.cookie("jwt", token, {
                        httpOnly: false,
                        maxAge: maxAge * 1000,
                      });
                    // return next(user, null)
                    return res.status(200).json({ 
                        success: true,
                        data: token,
                        user,
                        message: 'User logged in successfully' 
                    })
                })
            
            
        } catch (err) {
            return res.status(500).json({ message: 'Error logging in user' })
        }
    })(req, res, next)
}


const logout = async (req, res) => {
    try {
      res.cookie("jwt", "none", {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
      });
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      console.log(error.message, "error in logout controller");
    }
  };
  
const getAllUser = async(req, res ) => {
     await User.find({})
    .then((users) => {
        res.send(users)
    })
    .catch((err) => {
        console.log(err)
    });
}

module.exports = {
    signup,
    login,
    logout,
    getAllUser
}

