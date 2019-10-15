const express = require('express');
const router = express.Router(); // 创建路由对象

router.get('/',(req,res,next)=>{
    res.render('main/index',{ userInfo: req.userInfo });
});


module.exports = router;