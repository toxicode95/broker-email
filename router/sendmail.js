const express = require('express');
const { sendmailController } = require('./../controller');

const router = express.Router();
router.post('/sendmail', sendmailController.publish);

module.exports = router;
