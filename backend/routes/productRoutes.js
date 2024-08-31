const express = require('express');
const { 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    getAllProducts, 
    getProductById, 
    getProductsByCategory 
} = require('../controllers/productController');

const router = express.Router();

router.get('/products', getAllProducts);       
router.post('/products', addProduct);         
router.put('/products/:id', updateProduct);    
router.delete('/products/:id', deleteProduct); 
router.get('/products/:id', getProductById);   
router.get('/products/category/:category', getProductsByCategory); 

module.exports = router;
