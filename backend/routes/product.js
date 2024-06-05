const express = require('express');
const router = express.Router();
const productController = require('../controllers/product')
const { authAdminMiddleware } = require('../middlewares/auth')

router.post('/product', authAdminMiddleware, productController.createProduct)
router.get('/product', productController.productList)
router.get('/product/:id', productController.productDetails)
router.put('/product/:id', authAdminMiddleware, productController.editProduct)

module.exports = router