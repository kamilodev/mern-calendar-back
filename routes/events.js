const { Router } = require('express')
const { validateJWT } = require('../middlewares/validate-jwt')
const { fieldValidator } = require('../middlewares/field-validator')
const { check } = require('express-validator')
const { isDate } = require('../helpers/isDate')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')

const router = Router()

// Validate all routes with JWT
router.use(validateJWT)

// CREATE
router.get('/', getEvents)

// READ
router.post(
	'/',
	[
		check('title', 'You should be enter a title').not().isEmpty(),
		check('start', 'Start date is mandatory').custom(isDate),
		check('end', 'End date is mandatory').custom(isDate),
	],
	fieldValidator,
	createEvent,
)

// UPDATE
router.put(
	'/:id',
	[
		check('title', 'You should be enter a title').not().isEmpty(),
		check('start', 'Start date is mandatory').custom(isDate),
		check('end', 'End date is mandatory').custom(isDate),
	],
	fieldValidator,
	updateEvent,
)

// DELETE
router.delete('/:id', deleteEvent)

module.exports = router
