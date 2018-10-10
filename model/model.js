const mongoose = require('mongoose')//导入处理mongodb的插件的mongoose
// const DB_URL = 'mongodb://root:root@47.98.32.213:27017/blog'
const DB_URL = 'mongodb://127.0.0.1:27017/JSHao'
mongoose.connect(DB_URL,{useNewUrlParser:true}, (err)=> {
    　　if(err){
    　　　　console.log('Connection Error:' + err)
    　　}else{
    　　　　console.log('Connection success!') }
    })



mongoose.connection.on('connected',()=>{
    console.log('mongodb is connection')
})

//数据库记录
const models = {
    articles:{
        'title':{type:String,'require':true},
        'value':{type:String,'require':true},
        'name':{type:String,'require':true},
        'time':{type:String,'require':true},
        'discription':{type:String},
        'star':{type:Number},
        'readcount':{type:Number},
        'img':{type:String}
    },
    classify:{
        'name':{type:String}
    }   
}

const modelsFactory =(m)=>{
    for (const k in m) {
        if (m.hasOwnProperty(k)) {
            mongoose.model(k,new mongoose.Schema(m[k]))
        }
    }
} 

modelsFactory(models)


module.exports={
    getModel:(name)=>{
        return mongoose.model(name)
    }
}





//创建权限用户 　db.createUser({user:"admin",pwd:"admin",roles:[{role: "userAdminAnyDatabase",db:"admin"}]})