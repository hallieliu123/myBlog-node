const { log } = console;

const express = require('express');
const swig = require('swig');   // 加载模版处理模块
const mongoose = require('mongoose');  

const User = require('./models/users');

const bodyParser = require('body-parser');   
const Cookies = require('cookies');   

const app = express();   

app.use('/public',express.static(`${ __dirname }/public/`));  

app.use(bodyParser.urlencoded({extended:true})); // post传过来的数据都加密过，使用此中间件可解密并转成 json

app.use((req,res,next)=>{

    req.cookies = new Cookies(req,res);

    try{
        req.userInfo = JSON.parse(req.cookies.get('userInfo'));
        User.findById(req.userInfo._id)
            .then((info)=>{
                req.userInfo.isAdmin = Boolean(info.isAdmin)
            });
    }catch(err){}

    next();

});

app.engine('html',swig.renderFile); 

app.set('views','./views');

app.set('view engine','html');  

app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

swig.setDefaults({ cache: false });  

mongoose.connect('mongodb://localhost:27018/myBlog-node',(err)=>{
    if(err){
        log('数据库连接失败。。。');
    }else{
        log('数据库连接成功。。。');
        app.listen(8081);
    }
});









