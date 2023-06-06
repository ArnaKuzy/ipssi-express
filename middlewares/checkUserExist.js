const User = require('../models/User')

module.exports = async function (req, res, next) {
    const user = await User.find(req.params.id);

    if (!user)
        res.status(404).json('Cet utilisateur n\'existe pas')
    else {
        req.session = { user: user }
        next()
    }
}