const controllers = require('../controllers/widget');
const router = require('express').Router();

router.post('/', controllers.createWidgetController);
router.put('/:widgetId/price-strategy', controllers.updatePriceStrategy);

module.exports = router;