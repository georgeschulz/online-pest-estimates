const { createStripeSession } = require("../controllers/billing");
const router = require('express').Router();

router.post('/create-session', createStripeSession);

module.exports = router;