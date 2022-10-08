const { check } = require('express-validator');

const emailCheck = check('email')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Email can not be empty.')
    .bail()
    .isEmail()
    .withMessage('Please submit a a valid email as your username.')
    .bail()
    .isLength({ max: 62 })
    .withMessage('Please make sure you are only submitting on email (do not seperate multiple emails with commas).')
const passwordCheck = check('password')
    .custom(value => !/\s/.test(value))
    .withMessage('Please do not iclude any spaces in your password')
    .bail()
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Passsword can not be empty')
    .isLength({min: 7, max: 20})
    .withMessage('Pleae ensure that your password is between 7 and 20 characters')
module.exports = {
    emailCheck,
    passwordCheck
}