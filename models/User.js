const db = require('../databases/db');
const Address = require('./Address');
const { body } = require('express-validator')
const bcrypt = require('bcrypt');

class User {
    static #table_name = 'users';

    constructor(data) {
        this.id = data.id || null
        this.login = data.login || null
        this.password = data.password || null
        this.email = data.email || null
        this.session_token = data.session_token || null
        this.created_at = data.created_at || null
        this.updated_at = data.updated_at || null
        this.addresses = []
    }

    static validation_rules() {
        return [
            body('login').notEmpty(),
            body('password').notEmpty(),
            body('email').notEmpty().trim().isEmail(),
        ]
    }

    async get_addresses() {
        this.addresses = await Address.all_for_user(this.id)
    }

    static login(email) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE email = ?', email, (err, row) => {
                if (err)
                    reject(err)

                const user = (row) ? new User(row) : null
                resolve(user)
            })
        })
    }

    /**
     * Fonction pour enregistrer le token de session
     * @param {*} token 
     * @returns 
     */
    set_token(token) {
        return new Promise((resolve, reject) => {
            db.run("UPDATE users SET session_token = ? WHERE id = ?", [token, this.id], async (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                const user = User.find(this.id)
                resolve(user)
            })
        })
    }

    static all() {
        return new Promise((resolve, reject) => {
            const users = []
            db.each('SELECT * FROM users', (err, row) => {
                if (err)
                    reject(err)

                users.push(new User(row))
            }, async (err) => {
                for (const user of users) {
                    await user.get_addresses();
                }

                resolve(users)
            })
        })
    }

    static find(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE id = ?', id, (err, row) => {
                if (err)
                    reject(err)

                const user = (row) ? new User(row) : null
                resolve(user)
            })
        })
    }

    create() {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO users(login, password, email, created_at, updated_at) \
                VALUES(?, ? ,?, strftime('%Y-%m-%d %H:%M:%S','now'), strftime('%Y-%m-%d %H:%M:%S','now'))",
                [this.login, bcrypt.hashSync(this.password, 10), this.email],
                (err) => {
                    if (err) {
                        console.error(err)
                        reject(err)
                    }

                    resolve()
                })
        })
    }

    update(data) {
        return new Promise((resolve, reject) => {
            db.run("UPDATE users SET login = ? WHERE id = ?", [data.login, this.id], async (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                const user = User.find(this.id)

                resolve(user)
            })
        })
    }

    delete() {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM users WHERE id = ?", [this.id], (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                const user = User.find(this.id)
                if (!user)
                    reject('Erreur')

                resolve()
            })
        })
    }

    /**
     * Cette fonction est appelé par défaut l'orsque le model est convertit en 
     * objet JSON, il nous permet de définir le schema de la Resource que nous renvoyons
     * @returns Une ressource
     */
    toJSON() {
        return {
            id: this.id,
            login: this.login,
            email: this.email,
            addresses: this.addresses,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }
}

module.exports = User