const Users = require('../models/Users')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array })
    }
    const { email, password } = req.body;
    try {
        let user = await Users.findOne({ email });
        if (!user) {
            res.status(400).json({ msg: 'Credenciales incorrectas' })
        }
        let correctPass = await bcrypt.compare(password, user.password)
        if (!correctPass) {
            res.status(400).json({ msg: 'Credenciales incorrectas' });
        }
        const payload = {
            user: {
                id: user._id
            }
        }
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 604800
        }, (error, token) => {
            if (error) throw error;
            res.json({ token, user })
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'Ocurrio un error ' })
    }
}

exports.getAuthUser = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).select('-password')
        if (!user) {
            res.status(401).json({ msg: 'No posee permisos' });
        }
        res.status(200).json({ user })
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Error de servidor ' })
    }
}