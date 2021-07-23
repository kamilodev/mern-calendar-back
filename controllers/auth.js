const { response } = require('express')
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

const loginUser = (req, res = response) => {
	const { email, password } = req.body

	res.status(200).json({
		ok: true,
		msg: 'login',
		email,
		password,
	})
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
