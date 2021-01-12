const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.getUsers = async (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array })
    }
    try {
        const users = await Users.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'Hubo un error en la petición'})
    }
}

exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array })
    }
    const { email, password } = req.body;
    try {
        let user = await Users.findOne({ email });
        //Si el usuario existe, entonces que devuelva error
        if (user) {
            res.status(400).json({ msg: 'El usuario ya existe' });
        }
        user = new Users(req.body);
        //Genero Salt 
        const salt = await bcrypt.genSalt(10);
        //Hasheo Paswword
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        //guardo usuario y creo payload para jwt
        const payload = {
            user: {
                id: user._id
            }
        }
        jwt.sign(payload, process.env.SECRET, 
        {
            expiresIn: 3600
        },
        (error, token) => {
            if (error) throw error;
            return res.json({ token,user})
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error' })
    }
}

exports.getUser = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array })
    }
    const {id} = req.params;
    try {
        let user = await Users.findById(id).select('-password')
        return res.status(200).json(user)
    }
    catch(error)
    {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error' })
    }
}

exports.editUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array });
    }
    try {
        const userUpdated=req.body
        const newData = await Users.findByIdAndUpdate(req.params.id, userUpdated, { new: true }).select('-password')
        return res.status(200).json(newData)
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error en la petición" })
    }
}
exports.deleteUser = async (req,res) =>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array});
    }
    const {id} = req.params;
    try {
        await Users.findOneAndRemove({_id:id})
        res.status(200).json({msg:"Usuario eliminado"})
    } catch (error) {
        console.log(error)
        res.status(400).json({msg:"Error en la peticion"})
    }
}
