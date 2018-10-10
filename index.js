    const app = require('express')()
    // const utils = require('utility')//导入加密算法md5
    const bodyParser = require('body-parser')//处理post请求主体
    const cookiesParser = require('cookie-parser')//处理cookie



    //导入接口
    const userRouter=require('./Router/User') //user接口
    const classifyRouter=require('./Router/Classify') //user接口
    const ArticlesRouter=require('./Router/Articles') //user接口

    //中间件（插件use）
    app.use(
    cookiesParser(),
    bodyParser.json(),
    )
    
    // //跨域问题的解决
    // app.all('*', function(req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    //     res.header("X-Powered-By",' 3.2.1')
    //     res.header("Content-Type", "application/json;charset=utf-8");
    //     next();
    // });


    
    //接口和中间件Router的use
    app.use('/user',userRouter)
    app.use('/classify',classifyRouter)
    app.use('/article',ArticlesRouter)


    app.listen('9090',()=>{
        console.log("node app start at port 9090");
    })
