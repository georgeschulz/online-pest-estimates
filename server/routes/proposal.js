const router = require('express').Router();
const controllers = require('../controllers/proposal');

router.get('/:proposalId', controllers.readProposal);

module.exports = router;