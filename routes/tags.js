const express = require('express');
const router = express.Router();
const controller = require('../controllers/tagController');

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:tagId', controller.findOne);
router.put('/:tagId', controller.update);
router.delete('/:tagId', controller.delete);

module.exports = router;
