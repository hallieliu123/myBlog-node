const express = require('express');
const router = express.Router(); // 创建路由对象

router.get('/user',(req,res,next)=>{
    res.send('Hello world!');
});


module.exports = router;