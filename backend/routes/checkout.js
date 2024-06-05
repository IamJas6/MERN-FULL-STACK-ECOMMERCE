const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth')
const checkoutController = require('../controllers/checkout')

router.post('/checkout', authMiddleware, checkoutController.initiateCheckout)
router.put('/checkout/:orderId', authMiddleware, checkoutController.confirmCheckout)

module.exports = router