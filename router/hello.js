const express = require('express');
const { helloworldController } = require('./../controller');

const router = express.Router();
router.get('/hello', helloworldController.helloWorld);

module.exports = router;