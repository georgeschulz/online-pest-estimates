const controllers = require('../controllers/user');
const router = require('express').Router();

router.get('/', controllers.getUserInformation);
router.post('/business', controllers.createBusinessRecord);
router.put('/business', controllers.updateBusinessRecord);
router.put('/', controllers.updateUserAuth);

module.exports = router;