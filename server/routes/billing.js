const controllers = require('../controllers/billing')
const router = require('express').Router();
const express = require('express')

router.post('/create-session', controllers.createStripeSession);
router.post('/fulfill-setup', express.raw({type: 'application/json'}), controllers.fulfillInitialOrder);

module.exports = router;