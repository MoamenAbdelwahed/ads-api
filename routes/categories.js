const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryController');

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:categoryId', controller.findOne);
router.put('/:categoryId', controller.update);
router.delete('/:categoryId', controller.delete);

module.exports = router;
