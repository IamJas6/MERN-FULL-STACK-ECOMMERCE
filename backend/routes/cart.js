const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth')
const cartController = require('../controllers/cart')

router.post('/cart', authMiddleware, cartController.addToCart)
router.get('/cart', authMiddleware, cartController.getUserCart)
router.delete('/cart/:productId', authMiddleware, cartController.removeCart)

module.exports = router

