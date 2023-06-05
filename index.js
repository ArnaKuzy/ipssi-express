// Librairie
const express = require('express')
const logger = require('morgan')

// Création de l'app
const app = express()
const port = 3000
const users = [];

// Plugins
app.use(logger('dev'))

// Body Parsers
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Intégration de la db
app.use((req, res, next) => {
    req.db = {
        users: users
    }

    next()
})

// Route racine
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Routers
app.use('/user', require('./routes/user'))

// Démarrage du serveur
app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})