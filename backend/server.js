const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const PORT = 3000
const passport = require('passport')
const { connectToMongoDB } = require('./db')
const userRoute = require('./routes/userRoute')
const todoRoute = require('./routes/todoRoute')
const cors = require('cors')
require('dotenv').config()

connectToMongoDB()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
}))

app.use(express.json())

app.use(cookieParser())

app.get('/', (req, res) => {
    res.json('Welcome to Todo server!')
})
app.use('/auth', userRoute)
app.use('/todo', passport.authenticate('jwt', {session: false }) , todoRoute)





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})