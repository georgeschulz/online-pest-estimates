const router = require('express').Router();
const controllers = require('../controllers/proposal');

router.get('/:proposalId', controllers.readProposal);
router.put('/:proposalId/agree', controllers.agree)
router.get('/:proposalId/branding', controllers.getBrandingController);

module.exports = router;