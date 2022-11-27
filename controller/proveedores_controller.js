const { response } = require('express');
const Proveedor = require('../models/proveedores');

const newProveedor = async (req, res = response) => {
    try {
        const { uid } = req;

        const newProveedor = new Proveedor(req.body);
        newProveedor.registerId = uid;

        await newProveedor.save();

        return res.status(200).json({
            ok: true,
            'proveedores': [newProveedor],
        });

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'No fue posible hacer el registro.',
        });
    }
}
const getAllProveedor = async (req, res = response) => {
    try {
        const { uid } = req;
        const allProveedores = await Proveedor.find({ registerId: uid }).sort('-status');

        return res.status(200).json({
            ok: true,
            'proveedores': allProveedores,
        });

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en la consulta',
        });
    }
}

const proveedorChangeStatus = async (req, res = response) => {
    try {
        const { id } = req.body;
        const proveedor = await Proveedor.findById(id);
        proveedor.status = !proveedor.status;
        await proveedor.save();

        return res.status(200).json({
            ok: true,
            'proveedores': [proveedor],
        });

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en la consulta',
        });
    }
}

module.exports = {
    getAllProveedor,
    newProveedor,
    proveedorChangeStatus,
}