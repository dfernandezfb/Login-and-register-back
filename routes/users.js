"use strict";
const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController.js');
const { check } = require('express-validator');


router.get('/',[],userController.getUsers)
router.post('/', [
    check('name', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    check('password', 'La longitud minima es de 8 caracteres').isLength({ min: 8 })
],
    userController.createUser)

router.put('/:id',[],userController.editUser) 
router.delete('/:id',[],userController.deleteUser)


module.exports = router;