'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl');

//output
router.get('/', ctrl.output.home);
router.get('/:server/user/:username', ctrl.output.showRecord);

// process
router.get('/update/version', ctrl.process.getVersion);
router.get('/update/champion', ctrl.process.getChampion);

module.exports = router;