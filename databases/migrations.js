const db = require('./db')

db.serialize(() => {
    db.run('DROP TABLE users');
    db.run("CREATE TABLE IF NOT EXISTS users(   \
        id INTEGER PRIMARY KEY AUTOINCREMENT,   \
        login VARCAHR(50)                      \
    )")
    console.log('Table users créée')
})

db.close()