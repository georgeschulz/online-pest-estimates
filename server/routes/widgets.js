const controllers = require('../controllers/widget');
const router = require('express').Router();

router.post('/', controllers.createWidgetController);

module.exports = router;