module.exports = function (req, res, next) {
    res.session = {}
    next()
}