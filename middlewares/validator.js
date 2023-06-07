const { validationResult } = require("express-validator");

function validator(req, res, next) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(422)
            .json({
                message: "Formulaire invalide",
                errors: result.array()
            });
    }

    next()
}

module.exports = validator