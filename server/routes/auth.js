const controllers = require('../controllers/auth');
const router = require('express').Router();
const passport = require('passport');
const loginLocalValidator = require('../helpers/loginLocalValidator');

router.post('/register', controllers.signupLocal);
router.post('/login', loginLocalValidator, passport.authenticate('local'), controllers.signinLocal);
router.post('/logout', controllers.logout);
router.post('/login-google', () => {
    try {
        passport.authenticate('google', {scope: ['email', 'profile']})
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;