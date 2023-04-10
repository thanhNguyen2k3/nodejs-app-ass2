import Products from '../models/products.js';
import Joi from 'joi';
import productSchema from '../schemas/products.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Products.find();
        if (products.length === 0) {
            return res.json({
                alert: 'Không có sản phẩm nào',
            });
        }

        return res.json(products);
    } catch (error) {
        return res.status(400).json({
            alert: error,
        });
    }
};

export const getProduct = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);

        if (!product) {
            return res.json({
                alert: 'Không có sản phẩm nào',
            });
        }
        return res.json(product);
    } catch (error) {
        return res.status(400).json({
            alert: error,
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                alert: error.details[0].message,
            });
        }
        const product = await Products.create(req.body);
        if (!product) {
            return res.json({
                alert: 'Thêm sản phẩm không thành công',
            });
        }

        return res.json({
            alert: 'Thêm sản phẩm thành công',
            data: product,
        });
    } catch (error) {
        return res.status(400).json({
            alert: error,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                alert: error.details[0].message,
            });
        }
        const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!product) {
            return res.json({
                alert: 'Cập nhật sản phẩm không thành công',
            });
        }
        return res.json({
            alert: 'Cập nhật sản phẩm thành công',
            data: product,
        });
    } catch (error) {
        return res.status(400).json({
            alert: error,
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Products.findByIdAndDelete(req.params.id);

        return res.json({
            alert: 'Xóa sản phẩm thành công',
            product,
        });
    } catch (error) {
        return res.status(400).json({
            alert: error,
        });
    }
};
