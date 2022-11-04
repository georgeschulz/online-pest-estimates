const controllers = require('../controllers/widget');
const router = require('express').Router();

router.post('/', controllers.createWidgetController);
router.get('/:widgetId', controllers.getWidgetByIdController);
router.put('/:widgetId/price-strategy', controllers.updatePriceStrategy);
router.put('/:widgetId/details', controllers.updateWidgetDetailsController);
router.put('/:widgetId/proposal', controllers.updateWidgetProposalController);
router.put('/:widgetId/price-strategy-config', controllers.updatePriceStrategyConfigController)
router.delete('/:widgetId', controllers.deleteWidgetController)
router.put('/:widgetId/publish', controllers.toggleActiveWidget)
router.post('/:widgetId/create-proposal', controllers.createProposalController);

module.exports = router;