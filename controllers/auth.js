const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const createUser = async(req, res = response) => {
	const { email, password } = req.body
	try {
		let user = await User.findOne({email})
		if (user) {
			res.status(400).json({
				ok: false,
				msg: 'Email user registered in dataBase',
			})
		}

		user = new User(req.body)

		// Encrypt password
		const salt = bcrypt.genSaltSync()
		user.password = bcrypt.hashSync(password, salt)

		await user.save()

		res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name,
		})

	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Contact with admin dataBase'
		})
	}
}

const loginUser = async(req, res = response) => {
	const { email, password } = req.body

	try {
		let user = await User.findOne({email})
		if (!user) {
			res.status(400).json({
				ok: false,
				msg: 'Wrong user or email',
			})
		}

		// Confirm Password
		const validPassword = bcrypt.compareSync(password, user.password)

		if( !validPassword ) {
			return res.status(400).json({
				ok: false,
				msg: 'Wrong user or email',
			})
		}

		res.json({
			ok: true,
			uid: user.id,
			name: user.name,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			ok: false,
			msg: 'Contact with admin database'
		})
	}
}

const renewToken = (req, res = response) => {
	res.json({
		ok: true,
		msg: 'renew',
	})
}

module.exports = {
	createUser,
	loginUser,
	renewToken,
}

// db user: mern_user
// db pass: IjtndSI061n3o8F9
