const express = require('express');
const router = express.Router();

const homeRoute = require('./home');
const twitterRoute = require('./api/twitter');

router.use('/', homeRoute);
router.use('/api/twitter', twitterRoute);

module.exports = router;