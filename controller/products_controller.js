const Product = require('../models/product');
const { response } = require('express')

const newProuct = async (req, res = response) => {
    const { uid } = req;
    try {
        const product = new Product(req.body);
        product.propertype = uid;
        await product.save();

        return res.status(200).json({
            ok: true,
            product,
        });

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'No se puedo crear el nuevo producto.',
        });
    }


}

const getAllProducts = async (req, res = response) => {
    const { uid } = req;
    try {
        const products = await Product.find({ propertype: uid });
        return res.status(200).json({
            ok: true,
            products,
        });
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'No se puedo realizar la consulta.',
        });
    }
}

const updateProduct = async (req, res = response) => {
    const { body: newData } = req;
    try {
        const product = await Product.findById(req.body.id);
        // 
        product.name = newData.name;
        product.description = newData.description;
        product.purchasePrice = newData.purchasePrice;
        product.salePrice = newData.salePrice;
        product.stock = newData.stock;
        // 
        await product.save();

        return res.status(200).json({
            ok: true,
            product,
        });

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'No fue posible actualizar su producto',
        });
    }
}

const productChangeStatus = async (req, res = response) => {
    const { id } = req.body;
    try {
        const product = await Product.findById(id);
        product.status = !product.status;
        await product.save();

        return res.status(200).json({
            ok: true,
            product,
        });

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'No se puedo cambiar el estado.'
        });
    }
}

module.exports = {
    newProuct,
    getAllProducts,
    updateProduct,
    productChangeStatus,
}