/*
   User Routes /Auth
   host + /api/auth
*/

const { createUser, loginUser, renewToken } = require('../controllers/auth')
const { check } = require('express-validator')

const { Router } = require('express')
const { fieldValidator } = require('../middlewares/field-validator')
const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router()

router.post(
	'/new',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Email is required').isEmail(),
		check('password', 'Password is required').not().isEmpty(),
		check('password', 'Password minimum length must be at least 8 characters').isLength({
			min: 8,
		}),
		fieldValidator,
	],
	createUser,
)

router.post(
	'/',
	[
		check('email', 'Email is required').isEmail(),
		check('password', 'Password is required').not().isEmpty(),
		check('password', 'Password minimum length must be at least 8 characters').isLength({
			min: 8,
		}),
		fieldValidator,
	],
	loginUser,
)

router.get('/renew', validateJWT, renewToken)

module.exports = router
