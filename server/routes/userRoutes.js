const router = require('express').Router()
const { login} = require('../controllers/userController')

router.post("/login", login)

module.exports = router