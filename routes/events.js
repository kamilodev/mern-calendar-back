const { Router } = require('express')
const { validateJWT } = require('../middlewares/validate-jwt')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')

const router = Router()

// Validate all routes with JWT
router.use(validateJWT)

// CREATE
router.get('/', getEvents)

// READ
router.post('/', createEvent)

// UPDATE
router.put('/:id', updateEvent)

// DELETE
router.delete('/:id', deleteEvent)

module.exports = router
