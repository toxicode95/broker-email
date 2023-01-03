const express = require('express');
const hellowRouter = require('./hello');

const router = express.Router();

router.use('/', hellowRouter);

module.exports = router;
