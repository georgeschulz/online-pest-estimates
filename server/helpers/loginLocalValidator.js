const { emailCheck, passwordCheck } = require('./validatorElements/validators');
const handleChecks = require('./validatorElements/handleChecks');

const validateLogin = [
    emailCheck,
    passwordCheck,
    handleChecks
]

module.exports = validateLogin;