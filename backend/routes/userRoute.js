const router = require('express').Router();
const { signup, login, logout, updateUser, getUser } = require('../controllers/user')



router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.get('/profile/:username', getUser)
router.put('/profile/:username', updateUser)

module.exports = router