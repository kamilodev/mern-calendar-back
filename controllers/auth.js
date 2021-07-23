const { response } = require('express')
const User = require('../models/User')

const createUser = async(req, res = response) => {
	//const { name, email, password } = req.body
	try {
		const user = new User(req.body)
		await user.save()

		res.status(201).json({
			ok: true,
			msg: 'User registered in dataBase',
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
