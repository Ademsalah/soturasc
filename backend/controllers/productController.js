const { Product } = require('../database');

const addProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;
        const product = await Product.create({ name, description, price, image , category });
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, image, category } = req.body;
        const product = await Product.findByPk(id);

        if (product) {
            product.name = name;
            product.description = description;
            product.price = price;
            product.image = image;
            product.category = category;
            await product.save();
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (product) {
            await product.destroy();
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.findAll({
            where: { category }
        });

        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ error: 'No products found for this category' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory
};
