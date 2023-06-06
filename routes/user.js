const express = require('express')
const router = express.Router()
const checkUserExist = require('../middlewares/checkUserExist')
const User = require('../models/User')

router.route('/:id(\\d+)')
    // Récupération d'un utilisateur
    .get(checkUserExist, async (req, res) => {
        res.json(req.session.user);
    })
    // Modifier un utilisateur
    .put(checkUserExist, async (req, res) => {
        req.session.user = await req.session.user.update(req.body)

        res.json(`L'utilisateur ${req.session.user.login} à été modifié`)
    })
    // Supprimer un utilisateur
    .delete(checkUserExist, (req, res) => {
        const user = req.session.user

        user.delete()
            .then(() => {
                res.json(`L'utilisateur ${user.login} à été supprimé`)
            })
            .catch(err => {
                res.status(500).json(`Erreur`)
            })
    })

router.route('/')
    // Récupération de la liste des utilisateurs
    .get(async (req, res) => {
        const result = await User.all()

        res.send(result)
    })

    // Endpoint pour créer un utilisateur
    .post(async (req, res) => {
        // Création d'une instance de user
        const new_user = new User(req.body)

        // Syntax 1
        // new_user.create()
        //     .then(() => {
        //         res.status(201).json(`L'utilisateur ${req.body.nom} à été ajouté`)
        //     })
        //     .catch((err) => {
        //         res.status(500).json('Erreur serveur, Echec de l\'ajout')
        //     })

        // Syntax 2
        try {
            // Création en base de données via le model
            await new_user.create()

            // Réponse
            res.status(201).json(`L'utilisateur ${new_user.login} à été ajouté`)
        }
        catch (err) {
            console.error('Erreur dans la route', err)

            res.status(500).json('Erreur serveur, Echec de l\'ajout')
        }
    })

module.exports = router