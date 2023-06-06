const db = require('./db')

db.serialize(() => {
    db.run('DROP TABLE users');
    db.run("CREATE TABLE IF NOT EXISTS users(   \
        id INTEGER PRIMARY KEY AUTOINCREMENT,   \
        login VARCAHR(50) NOT NULL,             \
        password VARCHAR(100) NOT NULL,         \
        email VARCHAR(100) NOT NULL UNIQUE,     \
        created_at DATETIME,                    \
        update_at DATETIME                      \
    )")
    console.log('Table users créée')
})

db.close()