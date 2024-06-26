const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');
require('dotenv').config()


passport.use(
    new JWTStrategy(
        {
            secretOrKey: process.env.JWT_SECRET_KEY,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async function(token, done){
            try{
                return done(null, token.user)
            } catch (error){
                done(error)
            }
        }
    )
)


passport.use(
    'signup',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                const res = req.res
                const { username, confirmPassword } = req.body

                if(!email || !password || !username || !confirmPassword){
                    return res.status(400).json({ message: 'All fields are required' })
                }

                const existingUser = await User.findOne({ email  })
                if (existingUser) {
                    console.log('User already exists')
                    return res.status(400).json({ message: 'User already exists!. Login instead' })
                }

                if (password !== confirmPassword) {
                    return res.status(400).json({ message: 'Passwords do not match' })
                }

                const hashPassword = await bcrypt.hash(password, 10)
                // return console.log(req.body)
                const user = await User.create({ email, username, password: hashPassword })
            
                return done(null, user)
    
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                const res = req.res
                
                
                const user = await User.findOne({ email })
                if(!user) {
                    return res.status(404).send({ status: false, message: 'User not found'})
                }

                const validate = await user.verifyPassword(password)
                if(!validate) {
                    return res.status(401).send({
                        status: false,
                        message: 'Wrong password'
                    })
                }

                return done(null, user)
            } catch(error) {
                return done(error)
            }
        }
    )
)