/*
   User Routes /Auth
   host + /api/auth
*/

const { createUser, loginUser, renewToken } = require('../controllers/auth')

const { Router } = require('express')
const router = Router()

router.post('/new', createUser)

router.post('/', loginUser)

router.get('/renew', renewToken)

module.exports = router
