const db = require('../databases/db')

class Address {
    constructor(data) {
        this.id = data.id || null
        this.user_id = data.user_id || null
        this.street = data.street || null
        this.zip_code = data.zip_code || null
        this.city = data.city || null
    }

    static all() {
        return new Promise((resolve, reject) => {
            const addresses = []
            db.each('SELECT * FROM addresses', (err, row) => {
                if (err)
                    reject(err)

                addresses.push(new Address(row))
            }, (err) => {
                resolve(addresses)
            })
        })
    }

    static all_for_user(user_id) {
        return new Promise((resolve, reject) => {
            const addresses = []
            db.each('SELECT * FROM addresses WHERE user_id = ?', user_id, (err, row) => {
                if (err)
                    reject(err)

                addresses.push(new Address(row))
            }, (err) => {
                resolve(addresses)
            })
        })
    }

    create() {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO addresses(user_id, street, zip_code, city) \
                VALUES(?, ? ,?, ?)", [this.user_id, this.street, this.zip_code, this.city], (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                resolve()
            })
        })
    }

    toJSON() {
        return {
            id: this.id,
            street: this.street,
            zip_code: this.zip_code,
            city: this.city
        }
    }
}

module.exports = Address