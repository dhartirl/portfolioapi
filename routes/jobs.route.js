const express = require('express');
const router = express.Router();

const job_controller = require('../controllers/jobs.controller.js');

router.get('/', job_controller.list);
router.post('/create', job_controller.create);
router.put('/:id/update', job_controller.update);
router.delete('/:id/delete', job_controller.delete);
router.get('/:id', job_controller.item_details);

module.exports = router;