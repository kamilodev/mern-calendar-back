const express = require('express')
const { dbConnection } = require('./database/config')
const cors = require('cors')
require('dotenv').config()

// Create express server
const app = express()

// CORS
app.use(cors())

//Public Dir
app.use(express.static('public'))

// Read and parse of body
app.use(express.json())

// DataBase
dbConnection()

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

// Listeners
app.listen(process.env.PORT, () => {
	console.log(`Server on port ${process.env.PORT}`)
})
