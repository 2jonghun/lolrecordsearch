'use strict';

const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const ctrl = require('./home.ctrl');

const rateLimit10 = rateLimit({
  windowMs: 10 * 1000,
  max: 10,
  handler: function  (req, res, next) {
  },
  onLimitReached: function (req, res, options) {
    console.log('Rate Limit: user');
    res.status(429).send('Rate Limit');
  }
});

const rateLimit100 = rateLimit({
  windowMs: 10 * 1000,
  max: 100,
  handler: function  (req, res, next) {
  },
  onLimitReached: function (req, res, options) {
    console.log('Rate Limit: match');
    res.status(429).send('Rate Limit');
  }
});

//output
router.get('/', rateLimit10, ctrl.output.home);
router.get('/summoners/:server/:username', rateLimit10, ctrl.output.showRecord);

// process
router.get('/get/version', rateLimit10, ctrl.process.getVersion);
router.get('/get/runejson', rateLimit10, ctrl.process.getRunes);
router.get('/get/champions', rateLimit10, ctrl.process.getChampions);
router.get('/get/championjson', rateLimit10, ctrl.process.getChampionJson)
router.get('/:server/match/:matchid', rateLimit100, ctrl.process.getMatch);

module.exports = router;
module.exports = router;