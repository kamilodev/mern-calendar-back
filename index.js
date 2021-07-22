const express = require('express')
require('dotenv').config()

// Create express server
const app = express()

//Public Dir
app.use(express.static('public'))

// Read and parse of body
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))

// Listeners
app.listen(process.env.PORT, () => {
	console.log(`Server on port ${process.env.PORT}`)
})
