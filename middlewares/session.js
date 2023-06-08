module.exports = function (req, res, next) {
    req.session = { user: null}
    next()
}