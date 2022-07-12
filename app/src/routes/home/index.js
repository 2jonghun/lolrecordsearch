'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl');

router.get('/', ctrl.output.home);
router.get('/showRecord', ctrl.output.showRecord);
router.post('/getRecord', ctrl.process.getRecord);

module.exports = router;