const controllers = require('../controllers/auth');
const router = require('express').Router();
const passport = require('passport');
const loginLocalValidator = require('../helpers/loginLocalValidator');

const testHit = (req, res, next) => { console.log('hit'); next(); }

router.post('/register', controllers.signupLocal);
router.post('/login', loginLocalValidator, passport.authenticate('local'), controllers.signinLocal)

module.exports = router;