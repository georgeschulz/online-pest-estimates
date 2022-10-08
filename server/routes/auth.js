const controllers = require('../controllers/auth');
const router = require('express').Router();

router.post('/register', controllers.signupLocal);

module.exports = router;