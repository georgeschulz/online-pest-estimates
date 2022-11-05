const router = require('express').Router();
const controllers = require('../controllers/proposal');

router.get('/:proposalId', controllers.readProposal);
router.put('/:proposalId/agree', controllers.agree)

module.exports = router;