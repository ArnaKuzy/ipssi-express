module.exports = function (req, res, next) {
    if (req.params.id >= req.db.users.length)
        res.status(404).json('Cet utilisateur n\'existe pas')
    else
        next()
}