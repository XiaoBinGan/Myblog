const express = require('express')
const Router = express.Router()//导入路由的组件

Router.post('/',(req,res)=>{
    const {user,pwd} =req.body 
    console.log(req.body);
    if(user!='1017496103'&&pwd!='123wujiahao'){
        return res.json({"code":"0","msg":"用户名密码错误"})
    }
    res.cookie('userid','admin')
    return res.send({'code':"1","msg":"登陆成功"})
})

module.exports=Router







