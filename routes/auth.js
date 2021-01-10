const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');


router.post('/', auth, authController.authUser);
router.get('/', auth, auth, authController.getAuthUser);

module.exports = router