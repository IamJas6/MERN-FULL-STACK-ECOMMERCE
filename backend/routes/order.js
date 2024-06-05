const express = require('express');
const router = express.Router();
const { authAdminMiddleware, authMiddleware } = require('../middlewares/auth')
const allOrdersController = require('../controllers/order')

router.get('/order', authAdminMiddleware, allOrdersController.allOrders)
router.get('/order-user', authMiddleware, allOrdersController.userOrders)
router.get('/order/:orderId', authAdminMiddleware, allOrdersController.getOrderById)
router.put('/order/:orderId', authAdminMiddleware, allOrdersController.updateStaus)

module.exports = router