// Librairie
const express = require('express')
const logger = require('morgan')

// Création de l'app
const app = express()

// Plugins
app.use(logger('dev'))

// Body Parsers
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Middlewares
app.use(require('./middlewares/session'))

// Route racine
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Routers
app.use('/user', require('./routes/user'))
app.use('/address', require('./routes/address'))

module.exports = app