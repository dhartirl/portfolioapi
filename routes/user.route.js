const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller.js');

router.post('/login', user_controller.login);
router.post('/logout', user_controller.logout);
router.post('/create', user_controller.create);

module.exports = router;