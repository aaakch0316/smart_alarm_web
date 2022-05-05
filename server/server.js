import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'

import index from "./app/routes/index.js"

import db from './app/models/index.js'

import applyDotenv from './app/lambdas/applyDotenv.js'


async function startServer(){
    const app = express()
    const {mongoUri, port, jwtSecret} = applyDotenv(dotenv)
    app.use(express.static('public'));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use("/", index);
    app.use(morgan('dev'))
    db
    .mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('몽고DB 연결 성공')
    })
    .catch(err => {
        console.log('몽고DB와 연결 실패', err)
        process.exit();
    });

    app.listen(5000, () => {
        console.log('***************** ***************** *****************')
        console.log('********** 서버가 정상적으로 실행되고 있습니다 *********')
        console.log('***************** ***************** *****************')
    })
}
startServer()