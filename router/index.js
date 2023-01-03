const express = require('express');
const hellowRouter = require('./hello');
const sendmailRouter = require('./sendmail');

const router = express.Router();

router.use('/', hellowRouter);
router.use('/', sendmailRouter);

module.exports = router;
