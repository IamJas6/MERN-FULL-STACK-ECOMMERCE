//packages import
const express = require('express');
const router = express.Router();
const userController = require("../controllers/user") //importing controller
const { authMiddleware } = require("../middlewares/auth")

//routes or paths
router.post('/user', userController.signUp);  //user will be added before the path defined here i.e. /api
router.post('/user/login', userController.login);  
router.get('/user', authMiddleware, userController.userinfo);  //authMiddleware will be added before the path defined here i.e. /api

module.exports = router;  