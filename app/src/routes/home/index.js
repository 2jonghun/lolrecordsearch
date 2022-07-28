'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl');

//output
router.get('/', ctrl.output.home);
router.get('/:server/user/:username', ctrl.output.showRecord);

// process
router.get('/get/version', ctrl.process.getVersion);
router.get('/get/runejson', ctrl.process.getRunes);
router.get('/get/championjson', ctrl.process.getChampionJson)
router.get('/:server/match/:matchid', ctrl.process.getMatch);

module.exports = router;