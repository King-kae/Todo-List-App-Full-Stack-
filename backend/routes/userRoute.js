const router = require('express').Router();
const { signup, login, logout, getAllUser } = require('../controllers/user')



router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.get('/users', getAllUser)

module.exports = router