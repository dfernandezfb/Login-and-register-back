const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');


router.post('/',[], authController.authUser);
router.get('/', auth, authController.getAuthUser);

module.exports = router