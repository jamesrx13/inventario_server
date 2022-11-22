const { response } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya se encuentra registrado.'
            });
        }

        // Un admin está creando un usuario
        if (req.headers['x-token']) {
            try {
                const token = req.headers['x-token'];
                const { uid } = jwt.verify(token, process.env.JWT_KEY);
                const user = new User(req.body);
                user.isWorker = uid;
                // Encriptar contraseña
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(password, salt);
                // Guardar user
                user.save();
                return res.status(200).json({
                    ok: false,
                    msg: 'Trabajador creado',
                    user,
                });
            } catch (error) {
                return res.status(401).json({
                    ok: false,
                    msg: 'Token no válido!',
                });
            }


        }


        const user = new User(req.body);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        // Guardar
        await user.save();
        // Generar JWT
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno',
        });
    }

}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado',
            });
        }

        // Trabajador desactivado
        if (!userDB.status) {
            return res.status(401).json({
                ok: false,
                msg: 'Cuenta desactivada',
            });
        }

        // Validación de la contraseña
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta',
            });
        }
        // Generar JWT
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            user: userDB,
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno...',
        });
    }
}

const renewJWT = async (req, res) => {
    const { uid } = req;
    try {
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado!',
            });
        }

        const tokenRenew = await generateJWT(uid);
        res.json({
            ok: true,
            user,
            'token': tokenRenew,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno'
        });
    }

}

module.exports = {
    createUser,
    login,
    renewJWT,
}