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
            'products': [product],
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
        const products = await Product.find({ propertype: uid }).sort('-status');
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
            'products': [product],
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
            'products': [product],
        });

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'No se puedo cambiar el estado.'
        });
    }
}

const findProductByName = async (req, res = response) => {
    try {
        const { uid, body: { name } } = req;

        if (!name) {
            return res.status(401).json({
                ok: false,
                msg: 'No se recibió un producto a buscar.',
            })
        }

        const products = await Product.find({
            $and: [
                { propertype: uid },
                { status: true },
                { name: { $regex: '.*' + name + '.*', $options: 'i' } },
            ]
        }).limit(5);

        console.log(name);
        return res.status(200).json({
            ok: true,
            products,
        })

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            ok: false,
            msg: 'No se recibió un producto a buscar.',
        })
    }
}

const purchaseProduct = async (req, res = response) => {
    try {
        const { id, cant } = req.body;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado',
            });
        }

        product.stock += cant;
        await product.save();

        return res.status(200).json({
            ok: true,
            products: [product]
        });

    } catch (error) {

        return res.status(401).json({
            ok: false,
            msg: 'Error al cambiar la existencia',
        });
    }
}

module.exports = {
    newProuct,
    getAllProducts,
    updateProduct,
    productChangeStatus,
    findProductByName,
    purchaseProduct,
}