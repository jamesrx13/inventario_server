const { response } = require('express');
const User = require('../models/user');


const getAllUsers = async (req, res = response) => {

    const { uid } = req;

    const myWorkers = await User.find({ 'isWorker': uid }).sort('-status');

    res.status(200).json({
        ok: true,
        msg: 'Todos mis trabajadores',
        myWorkers,
    })
}

const disabledUser = async (req, res = response) => {
    const { uuid } = req.body;
    try {
        const user = await User.findById(uuid);
        user.status = !user.status;
        await user.save();
        res.status(200).json({
            ok: true,
            msg: user.status ? 'Usuario activado' : 'Usuario desactivado',
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Usuario no encontrado',
        });
    }
}

module.exports = {
    getAllUsers,
    disabledUser,
}