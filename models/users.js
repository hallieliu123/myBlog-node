const mongoose = require('mongoose');
const usersSchema = require('../schema/users');

// 用户数据模型
module.exports = mongoose.model('Users',usersSchema);

// 
