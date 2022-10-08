const { validationResult } = require('express-validator')

const handleChecks = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log("Input validation error for user: ", errors)
        res.status(422).json(errors.errors[0].msg);
    } else {
        next();
    }
}

module.exports = handleChecks;