const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    purchasePrice: {
        type: Number,
        required: true,
    },
    salePrice: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
    },
    propertype: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
});

ProductSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Product', ProductSchema);