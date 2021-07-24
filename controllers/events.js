const { response } = require('express')
const Event = require('../models/Event')

const getEvents = async (req, res = response) => {
	const events = await Event.find().populate('user', 'name email')

	res.json({
		ok: true,
		events,
	})
}

const createEvent = async (req, res = response) => {
	const event = new Event(req.body)

	try {
		event.user = req.uid
		const eventSaved = await event.save()
		res.json({
			ok: true,
			event: eventSaved,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			ok: false,
			msg: 'Contact with administrator',
		})
	}
}

const updateEvent = async (req, res = response) => {
	const eventId = req.params.id
	const uid = req.uid

	if (eventId.length < 24 || eventId.length > 24) {
		res.status(400).json({
			ok: false,
			msg: 'Id event must be between 24 characters',
		})
	} else {
		try {
			const event = await Event.findById(eventId)

			if (!event) {
				return res.status(404).json({
					ok: false,
					msg: 'This event dont exist whith current Id',
				})
			}

			if (event.user.toString() !== uid) {
				return res.status(400).json({
					ok: false,
					msg: 'You dont have permission to edit this event',
				})
			}

			const newEvent = {
				...req.body,
				user: uid,
			}

			const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

			res.json({
				ok: true,
				event: eventUpdated,
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({
				ok: false,
				msg: 'Contact with administrator',
			})
		}
	}
}

const deleteEvent = async (req, res = response) => {
	const eventId = req.params.id
	const uid = req.uid

	if (eventId.length < 24 || eventId.length > 24) {
		return res.status(400).json({
			ok: false,
			msg: 'Id event must be between 24 characters',
		})
	} else {
		try {
			const event = await Event.findById(eventId)

			if (!event) {
				res.status(404).json({
					ok: false,
					msg: 'This event dont exist whith current Id',
				})
			}

			if (event.user.toString() !== uid) {
				return res.status(400).json({
					ok: false,
					msg: 'You dont have permission to edit this event',
				})
			}

			await Event.findByIdAndDelete(eventId)

			res.json({
				ok: true,
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({
				ok: false,
				msg: 'Contact with administrator',
			})
		}
	}
}

module.exports = {
	getEvents,
	createEvent,
	updateEvent,
	deleteEvent,
}
