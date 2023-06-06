const express = require('express')
const router = express.Router()
const checkUserExist = require('../middlewares/checkUserExist')
const User = require('../models/User')

router.route('/:id(\\d+)')
    // Récupération d'un utilisateur
    .get(checkUserExist, (req, res) => {
        res.json(req.db.users[req.params.id]);
    })
    // Modifier un utilisateur
    .put(checkUserExist, (req, res) => {
        req.db.users[req.params.id] = req.body.nom
        res.json(`L'utilisateur ${req.db.users[req.params.id]} à été modifié`)
    })
    // Supprimer un utilisateur
    .delete(checkUserExist, (req, res) => {
        const user = req.db.users[req.params.id]
        delete req.db.users[req.params.id]
        res.json(`L'utilisateur ${user} à été supprimé`)
    })

router.route('/')
    // Récupération de la liste des utilisateurs
    .get((req, res) => {
        const result = User.all()

        res.send(result)
    })
    // Endpoint pour créer un utilisateur
    .post((req, res) => {
        // Si le nom existe on l'ajoute
        if (req.body.nom) {
            const new_user = new User(req.body.nom)
            new_user.create()

            console.log(new_user)
            res.status(201).json(`L'utilisateur ${req.body.nom} à été ajouté`)

            // Sinon on retourne une erreur
        } else {
            res.status(400).json('Echec de l\'ajout')
        }
    })

module.exports = router