const Router =require('express').Router()
const model =require('../model/model')//获取mongoos当中的model
const Classify=model.getModel('classify')//获取MongoDB当中的class

/**
 * 查询
 */
Router.post('/',(req,res)=>{
        Classify.find({},(err,doc)=>{
            if(!err){
                return res.json({"code":1,"data":doc,"msg":"数据返回成功"})
            }
                return res.json({"msg":"不好意思出错了"})
        })
})
/**
 * 增加
 */
Router.post('/addclassify',(req,res)=>{
    const {userid} = req.cookies
    const { name } = req.body
    if(userid!="admin"){
        return res.json({"code":0,"msg":"请重新登陆"})
    }else if(!name){
        return res.json({"msg":"请输入模块名称"})
    }else{
        Classify.findOne({name},(err,doc)=>{
            if(doc){
                return res.json({"msg":"模块名重复了"})
            }
            const ClassifyModel = new Classify({name})
            ClassifyModel.save((err,doc)=>{
                if(err){
                    return res.json({"msg":"后台出错了"})
                }
                const { name } = doc
                console.log(name) 
                return res.json({"msg":"添加成功"})
            })
        })
    }

})
/**
 * 删除 params{name}
 * 更具传入的name删除
 */
Router.post('/rm',(req,res)=>{
    const {userid} = req.cookies
    const { name } = req.body
    if(userid!="admin"){
        return res.json({"code":0,"msg":"请重新登陆"})
    }else if(!name){
        return res.json({"msg":"请输入模块名称"})
    }else{
        Classify.remove({name},(err,doc)=>{
            if(err){
                return res.json({"msg":"后台出错啦"})
            }
            return res.json({"msg":"删除成功"})
        })
    }
})

module.exports=Router