const express = require('express');
const router = express.Router();
const { authAdminMiddleware } = require('../middlewares/auth')
const categoryController = require('../controllers/category') //importing controller

router.post('/category', authAdminMiddleware, categoryController.createCategory);  //category will be added before the path defined here i.e. /api

router.get('/category', categoryController.categoryList);  //category will be added before the path defined here i.e. /api

module.exports = router