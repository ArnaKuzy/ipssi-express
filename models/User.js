const db = require('../databases/db')

class User {
    constructor(login) {
        this.login = login
    }

    static all() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM users', (err, rows) => {
                if (err)
                    reject(err)

                resolve(rows)
            })

            db.close()
        })
    }

    static find(id) {
        // Todo
    }

    create() {
        db.run("INSERT INTO users(login) VALUES(?)", this.login)
        db.close()
    }

    update() {
        // Todo
    }

    delete() {
        // Todo
    }
}

module.exports = User