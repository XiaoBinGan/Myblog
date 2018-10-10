const Router =require("express").Router()
const model =require("../model/model") 
const arcticles= model.getModel("articles")
const classify=model.getModel("classify")

// Router.get("/",(req,res)=>{
//     console.log(req)
//     classify.find({},(err,doc)=>{
//         if(err){
//             return res.json({msg:"后台出错啦"})
//         }
//         doc.forEach(e=>{
//            console.log(e.name.includes("test")); 
//         })
//         return  res.json({data:doc})
//     })
// })
/**
 * 请求参数name为all 就是全部
 * 如果name是分类名称就返回所以得该name分类的文章
 */
Router.post("/",(req,res)=>{
    const { name } = req.body
    if(name=="all"){
        arcticles.find({},(err,doc)=>{
            if(err){
                return res.json({"msg":"后台出错啦"})                
            }else{
                console.log(doc)
                return res.json({"msg":"数据返回成功","data":doc})
            }
        })
    }else if(name!=""&&name!="all"){
        arcticles.find({name},(err,doc)=>{
            if(err){
                return res.json({"msg":"后台出错啦"})                
            }else if(doc.length!=0){
                return res.json({"msg":"数据返回成功","data":doc})
            }else{
                return res.json({"msg":"分类存在但是数据为空"})
            }
        })
    }
})
/**
 * 添加文章title,value,name,time必传参数
 */
Router.post('/add',(req,res)=>{
    const {title,value,name,time}=req.body
    const {userid} = req.cookies
    if(userid!="admin"){
        return res.json({"msg":"权限验证失败重新登录"})
    }
    if(!title||!value||!name||!time){
        return res.json({"msg":"请检查必填字段"})
    }
    arcticles.findOne({title},(err,doc)=>{
        if(doc){
            return res.json({"msg":"文章已经存在请不要重复添加"})
        }
       arcticles.create({title,value,name,time},(e,doc)=>{
            if(e){
                return res.json({"msg":"后台出错啦"})       
            }
            return res.json({"msg":"添加成功"}) 
        })
    })
})



module.exports=Router




