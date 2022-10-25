const controllers = require('../controllers/auth');
const router = require('express').Router();
const passport = require('passport');
const loginLocalValidator = require('../helpers/loginLocalValidator');

router.post('/register', controllers.signupLocal);
router.post('/login', loginLocalValidator, passport.authenticate('local'), controllers.signinLocal);
router.post('/logout', controllers.logout);
router.get('/login-google', passport.authenticate('google', {scope: ['email', 'profile']}));
router.get('/recieve-google', controllers.recieveGoogleRedirect, passport.authenticate('google', {failureRedirect: '/signup', failureMessage: true}));

module.exports = router; 