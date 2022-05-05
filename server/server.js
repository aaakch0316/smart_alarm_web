import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'

import index from "./app/routes/index.js"

async function startServer(){
    const app = express()
    
    app.use(express.static('public'));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use("/", index);
    app.use(morgan('dev'))

    app.listen(5000, () => {
        console.log('***************** ***************** *****************')
        console.log('********** 서버가 정상적으로 실행되고 있습니다 *********')
        console.log('***************** ***************** *****************')
    })
}
startServer()