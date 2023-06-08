const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')
        const decoded = jwt.verify(token[1], 'secret')

        const user = await User.find(decoded.id)
        if (token[1] === user.session_token) {
            req.session.user = user
            next()
        } else
            res.status(401)
                .json('Token invalide')
    } else
        res.status(401).json('Vous devez vous authentifier')
}