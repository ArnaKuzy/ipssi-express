const express = require('express')
const router = express.Router()
const Address = require('../models/Address')

router.route('/')
    // Récuperer toutes les adresses
    .get(async (req, res) => {
        const addresses = await Address.all()

        res.send(addresses);
    })

    // Créer une adresse
    .post((req, res) => {
        const new_address = new Address(req.body)

        new_address.create()
            .then(() => {
                res.status(201).json("L'adresse à été créée")
            })
            .catch(err => {
                console.error(err)
                res.status(500).json("Erreur")
            })
    })

module.exports = router