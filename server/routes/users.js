const express = require('express');
const {protect}=require('../middleware/auth');
const router = express.Router();

const {register,login,getMe,logout}=require('../controller/auth');

router.post('/register',register);
router.post('/login',login);
router.get('/logout',protect,logout);
router.get('/me',protect,getMe);

module.exports=router;