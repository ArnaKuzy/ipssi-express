const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const user = await User.login(req.body.email)

    if (!user)
        return res.status(400).json('Identifiants invalides')

    if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ id: user.id }, 'secret');
        await user.set_token(token)

        res.json({
            message: 'Succès',
            token: token
        })
    }
    else
        res.status(400).json('Identifiants invalides')

    console.log(user)
})

module.exports = router