import db from '../models/index.js'


export default function UserService() {
    const User = db.User    

    return {
        join(req, res){
            console.log('data :' + JSON.stringify(req.body)) // req가 json이 아니라 req.body가 json이다.
            new User(req.body).save(function(err){ // 람다 써도 된다. 성능차이 없다
                if(err){
                    res.status(500).json({message: err})
                    console.log('회원가입 실패')  // 로고 찍는 것도 있는데, 이정도는 우리 할 수 있데. 그러니 콘솔
                    return; // return 안하면, 자동으로 next 로 다른것으로 넘어가니까 에러를 끊어줘야한다. 안하면 화면으로 넘어간다
                } else {
                    console.log('회원가입 성공 ' )
                    res.status(200).json({result: 'ok'})  // 판단만 가능하게 하자. // 개인정보 주진 말고 로그인 창으로 넘기도록 만들자.
                }
            })
            // res.status(200).json({})
        },
        login(req, res) {    // 토큰 쪽을 확인하자.
            User.findOne({
                email: req.body.email
            }, function (err, user) {
                if (err) 
                    throw err
                if (!user) {
                    res
                        .status(401)
                        .send({success: false, message: '해당 ID가 존재하지 않습니다'});
                } else {
                    console.log('login: data' + JSON.stringify(user))
                    console.log(req.body)
                    user.comparePassword(req.body.password, function (_err, isMatch) {
                        if (!isMatch) {
                            res
                                .status(401)
                                .send({message:'FAIL'});
                        } else {
                            user.generateToken((err, user) => {
                                if (err) 
                                    res
                                        .status(400)
                                        .send(err)

                                res
                                    .status(200)
                                    .json(user)
                            })
                        }
                    })
                }
            })
        },
        alarm(req, res) {
            User.findOne({
                email: req.body.email
            }, function (err, user) {
                if (err) 
                    throw err
                if (!user) {
                    res
                        .status(401)
                        .send({success: false, message: '해당 ID가 존재하지 않습니다'});
                } else {
                    console.log(JSON.stringify(user.alarm))
                    console.log(req.body)
                    user.addAlarm(req.body, (err,user)=>{
                        if(err) return res.json({
                            success : false,
                        })
                        res.json(user)
                    })
                }
            })
        },
        getUserByToken(req, res, next){ 
            let token = req.body.token;
            console.log(token)
            User.findByToken(token,(err,user)=>{
                if(err) return res.json({
                    isAuth : false,
                    error : true
                });
                if(!user) return res.json({
                    isAuth : false,
                    error : true
                });
                // req.token = token;
                // req.user = user;
                next();
                // res.json(user)
            })
        },
    }
}