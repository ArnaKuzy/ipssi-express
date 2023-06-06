const sqlite3 = require('sqlite3').verbose()

// Connexion à la base de données sqlite
const db = new sqlite3.Database('./databases/database.db', (err) => {
    if (err) 
        return console.error(err.message);

    console.log('Connexion à la DB réussie');
})

// Export
module.exports = db;