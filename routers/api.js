
const express = require('express');
const router = express.Router(); // 创建路由对象
const User = require('../models/users');

let responseData;
router.use((req,res,next)=>{
    responseData = {
        code: 0,
        message: '注册成功'
    }
    next();
});
/**
 * 用户注册
 */
router.post('/user/register',(req,res,next)=>{
    const { username,password,repassword } = req.body;
    if( username == ''){
        responseData.code = 1;
        responseData. message = '请输入用户名';
        res.json(responseData);
        return
    }
    if( password == ''){
        responseData.code = 2;
        responseData.message = '请输入密码';
        res.json(responseData);
        return
    }
    if( repassword == ''){
        responseData.code = 3;
        responseData.message = '请输入再次密码';
        res.json(responseData);
        return
    }
    if( password != repassword){
        responseData.code = 4;
        responseData.message = '两次密码不一致';
        res.json(responseData);
        return
    }

    User.findOne({username:username})
        .then((userInfo)=>{
            if(userInfo){
                responseData.code = 5;
                responseData.message = '用户名已存在';
                return
            }else{
                let user = new User({username:username,password:password});
                return user.save(); // 存入数据库
            }
        })
        .then((newUserInfo)=>{
            res.json(responseData);
        });
        
    // User.count().then((count)=>{});数据库表中的数据
    // User.find() 读取当前表所有的数据库数据
    // User.findOne({_id:{$ne:id},username:username}}) // 要修改的分类是否在数据库中存在
    // User.update({_id: id},{username:username}) // 数据库已存在，用来更新数据
    // User.remove({_id: id}) // 数据库已存在，用来删除数据

    // 表结构定义关联字段
    /**
     * category:{
     *     type: mongoose.Schema.Types.ObjectId, // 数据库表内字段的id
     *     ref: 'Category'   // 引用： 关联的对应的数据库表模型 
     * }
     */
});

/**
 * 用户登陆
 */
router.post('/user/login',(req,res,next)=>{
    // 先校验是否存在
    const { username,password } = req.body;
    if(username =='' || password == ''){
        responseData.code = 1;
        responseData.message = '请输入用户名和密码';
        res.json(responseData);
        return;
    }
    // 数据库数据校验
   User.findOne({ username,password })
    .then((userInfo)=>{
        if(!userInfo){
            responseData.code = 2;
            responseData.message = '用户或密码错误';
            res.json(responseData);
            return 
        }
        responseData.code = 0;
        responseData.message = '登陆成功';
        responseData.userInfo = {
            _id: userInfo._id,
            username: userInfo.username
        };
        req.cookies.set('userInfo',JSON.stringify({
            _id: userInfo._id,
            username: userInfo.username
        }));
        res.json(responseData);
    });
});

router.get('/user/logout',(req,res,next)=>{
    req.cookies.set('userInfo',null);
    responseData.code = 0;
    responseData.message = '';
    res.json(responseData);
});


module.exports = router;









