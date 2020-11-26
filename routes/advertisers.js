const express = require('express');
const router = express.Router();
const controller = require('../controllers/adController');
const auth = require('../middleware/auth');

router.get('/', auth, controller.findAdvertisers);

module.exports = router;
