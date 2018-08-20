const express = require('express');
const router = express.Router();

const file_controller = require('../controllers/file.controller.js');

router.post('/upload', file_controller.upload);

module.exports = router;