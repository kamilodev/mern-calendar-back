const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CNN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		console.log('DB Connected!')
	} catch (error) {
		console.log(error)
		throw new Error('Error to try connect to DB')
	}
}

module.exports = {
	dbConnection,
}
