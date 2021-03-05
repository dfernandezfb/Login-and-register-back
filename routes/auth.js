const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');



router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('email', 'El email no puede tener más de 30 caracteres').isLength({ max: 30 }),
    check('password', 'Su contraseña debe poseer 8 caracteres como mínimo').isLength({ min: 8 }),
    check('password', 'Su contraseña no puede tener más de 30 caracteres').isLength({ max: 30 }),
],authController.login);
router.get('/', auth, authController.getAuthUser);

module.exports = router