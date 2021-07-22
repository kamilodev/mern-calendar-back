const express = require('express')
require('dotenv').config()


// Create express server
const app = express()

//Public Dir
app.use(express.static('public'));


//Routes
/*app.get('/', (req, res) => {
    console.log('First Route Installed')
    res.json({
        ok: true
    })
})*/

// Listeners
app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`)
})