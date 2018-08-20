const express = require('express');
const router = express.Router();

const portfolio_controller = require('../controllers/portfolio.controller.js');

router.get('/', portfolio_controller.list);
router.post('/create', portfolio_controller.create);
router.put('/:id/update', portfolio_controller.update);
router.delete('/:id/delete', portfolio_controller.delete);
router.get('/:id', portfolio_controller.item_details);

module.exports = router;