const controllers = require('../controllers/widget');
const router = require('express').Router();

router.post('/', controllers.createWidgetController);
router.get('/:widgetId', controllers.getWidgetByIdController);
router.put('/:widgetId/price-strategy', controllers.updatePriceStrategy);
router.put('/:widgetId/details', controllers.updateWidgetDetailsController);
router.put('/:widgetId/proposal', controllers.updateWidgetProposalController);

module.exports = router;