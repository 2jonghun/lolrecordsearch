'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl');


router.get('/', ctrl.output.home);
router.get('/showrecord/:server/:username', ctrl.output.showRecord);

router.post('/getmatchid', ctrl.process.getMatchId);

module.exports = router;