const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController.js');
const { check } = require('express-validator');


router.get('/',[],userController.getUsers)
router.get('/:id',[],userController.getUser)
router.post('/', [
    check('name', 'El nombre es un campo obligatorio').not().isEmpty(),
    check('name', 'El nombre no puede tener más de 30 caracteres').isLength({ max: 30 }),
    check('lastname', 'El apellido es un campo obligatorio').not().isEmpty(),
    check('lastname', 'El apellido no puede tener más de 30 caracteres').isLength({ max: 30 }),
    check('email', 'El email es obligatorio').isEmail(),
    check('email', 'El email no puede tener más de 30 caracteres').isLength({ max: 30 }),
    check('password', 'La contaseña es obligatoria').not().isEmpty(),
    check('password', 'Su contraseña debe poseer 8 caracteres como mínimo').isLength({ min: 8 }),
    check('password', 'Su contraseña no puede tener más de 30 caracteres').isLength({ max: 30 }),
],userController.createUser)

router.put('/:id',[],userController.editUser) 
router.delete('/:id',[],userController.deleteUser)


module.exports = router;