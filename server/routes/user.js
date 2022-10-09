const controllers = require('../controllers/user');
const router = require('express').Router();

router.get("/", controllers.getUserInformation);
router.post('/business', controllers.createBusinessRecord);
router.put('/business', controllers.updateBusinessRecord);

module.exports = router;