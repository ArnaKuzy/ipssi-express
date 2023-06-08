const db = require('./db')

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS users');
    db.run("CREATE TABLE IF NOT EXISTS users(   \
        id INTEGER PRIMARY KEY AUTOINCREMENT,   \
        login VARCAHR(50) NOT NULL,             \
        password VARCHAR(100) NOT NULL,         \
        email VARCHAR(100) NOT NULL UNIQUE,     \
        session_token VARCHAR(100) UNIQUE,      \
        created_at DATETIME,                    \
        updated_at DATETIME                     \
    )")
    console.log('Table users créée')

    db.run('DROP TABLE IF EXISTS addresses');
    db.run("CREATE TABLE IF NOT EXISTS addresses(   \
        id INTEGER PRIMARY KEY AUTOINCREMENT,       \
        user_id INTEGER NOT NULL,                            \
        street VARCHAR(100) NOT NULL,                        \
        zip_code VARCHAR(5) NOT NULL,                        \
        city VARCHAR(50) NOT NULL,                           \
        created_at DATETIME,                    \
        updated_at DATETIME                      \
        )")
})

db.close()