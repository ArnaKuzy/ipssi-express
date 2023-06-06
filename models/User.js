const db = require('../databases/db')

class User {
    constructor(login) {
        this.login = login
    }

    static async all() {
        const result = await db.all('SELECT * FROM users', (err, rows) => {
            if (err)
                return console.error(err)

            console.log(rows)

            return rows
        })

        return result;
    }

    create() {
        db.serialize(() => {
            const stmt = db.prepare("INSERT INTO users(login) VALUES(?)")
            stmt.run(this.login)
            stmt.finalize()
        })
    }

    update() {
        
    }
}

module.exports = User