const controllers = require('../controllers/widget');
const router = require('express').Router();

router.post('/', controllers.createWidgetController);
router.put('/:widgetId/price-strategy', controllers.updatePriceStrategy);
router.put('/:widgetId/details', controllers.updateWidgetDetailsController);

module.exports = router;