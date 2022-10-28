const controllers = require('../controllers/billing')
const router = require('express').Router();
const express = require('express')

router.post('/create-session', controllers.createStripeSession);
router.post('/fulfill-setup', express.raw({type: 'application/json'}), controllers.fullfillOrder);
router.post('/create-portal-session', express.json(), controllers.createPortalSession);

module.exports = router;