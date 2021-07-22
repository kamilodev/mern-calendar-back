const express = require('express')

// Create express server
const app = express()


//Routes
app.get('/', (req, res) => {
    console.log('First Route Installed')
    res.json({
        ok: true
    })
})

// Listeners
app.listen(4000, () => {
    console.log(`Server on port ${4000}`)
})