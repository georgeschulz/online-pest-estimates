const controllers = require('../controllers/user');
const router = require('express').Router();
const passport = require('passport');

router.get("/", controllers.getUserInformation);

module.exports = router;