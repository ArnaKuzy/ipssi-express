const app = require('./app')
const port = 3000

// Démarrage du serveur
app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})