import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import UserService from "../services/user.js"


dotenv.config()
const corsOptions = {
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200
}

const app = express()
app.use(cors());
// app.use(cors(corsOptions
app.use(function (_req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
app.post('/join', cors(corsOptions), (req, res) => { 
    UserService().join(req, res)
})

app.post('/login', cors(corsOptions), (req, res) => {
    UserService().login(req, res)
})

app.post('/alarm', cors(corsOptions), (req, res) => {
    UserService().alarm(req, res)
})


app.post('/', cors(corsOptions), (req, res) => {
    console.log('token test')
    UserService().getUserByToken(req, res)
})

app.post('/a', UserService().getUserByToken, (req, res) => {
    console.log('token success')
    res.json({success: true})
})

// 로그아웃 로직을 보면 passport를 통과해야한다
// app.get('/logout', passport.authenticate('jwt', {session: false}), (req, res) => { // passport.authenticate('jwt', {session: false}) 이렇게 중간에 들어가면 미들웨어다. 세션안쓴다.  인증 미들웨어 통과하면 다음 {} 내부 로직 돈다
//     UserService().logout(req, res)
// })

export default app;