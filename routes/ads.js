const express = require('express');
const router = express.Router();
const controller = require('../controllers/adController');
const auth = require('../middleware/auth');

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/own', auth, controller.myAds);
router.get('/:adId', controller.findOne);
router.put('/:adId', controller.update);
router.delete('/:adId', controller.delete);

module.exports = router;
