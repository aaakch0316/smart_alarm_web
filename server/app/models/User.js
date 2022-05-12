import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import applyDotenv from '../lambdas/applyDotenv.js'

export default function UserModel(mongoose) {
    const {jwtSecret} = applyDotenv(dotenv)
    const alarmSchema = mongoose.Schema({
        // isCheck: {type: Boolean, required: true},
        content: {type: String, required: true},
        // alertTime: {type: Date, required: true},
        alerthour: {type: String, required: true},
        alertmin : {type: String, required: true},
        period: String,
        // alertTime: {type: String, required: true},
        mp4Url: String
    })
    const userSchema = mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: 1
        },
        password: {
            type: String,
            required: true,
        },
        name: String,
        age: String,
        feature: String,
        phone: String,
        alarm: [alarmSchema]
    }, {timestamps: true});
    userSchema.pre("save", function (next){
        let user = this;
        const saltRounds = 10
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if(err) return next(err);
                user.password = hash;
                next()
            })
        })
    });
    userSchema.methods.comparePassword = function (plainPassword, cb) {      
        let isMatch = false
        if (bcrypt.compare(plainPassword, this.password)) {
            console.log('비밀번호 일치')
            isMatch = true
        } else {
            console.log('비밀번호 불일치')
            isMatch = false
        }
        bcrypt.compare(plainPassword, this.password, function (err, _isMatch) {
            if (err) {
                return cb(err)
            } else {
                return cb(null, isMatch);
            }
        })
    }
    userSchema.methods.generateToken = async function (cb) {
        var user = this;
        console.log(" jwtSecret >> " + jwtSecret)
        // var token = await jwt.sign(user._id.toHexString(), jwtSecret, {expiresIn : '1d'})
        const payload = {user : user.email}
        // jwtSecret => uuid 사용 - 서명을 만들 때 사용되는 암호 문자열
        // var token = await jwt.sign(payload, "005c9780fe7c11eb89b4e39719de58a5", {expiresIn : "1d"})
        var token = await jwt.sign(payload, jwtSecret, {expiresIn : "1d"})
        console.log(token)
        user.token = token
        user.save(function (err, user) {
            console.log(user.token)
            if (err) 
                return cb(err);
            cb(null, {success: true, accessToken: user.token, userDetail: user})
        })
    }
    userSchema.statics.findByToken = function (token, cb) {
        var user = this;
        jwt.verify(token, jwtSecret, function (err, decode) {
            if (typeof decode === 'undefined') return cb('not token')
            user.findOne({
                "email": decode.user,
                // "token": token
            }, function (err, user) {
                if (err) 
                    {
                        return cb(err);
                    }
                cb(null, user);
            })
        })
    }
    userSchema.methods.addAlarm = function (alarm, cb) {
        console.log(1)
        console.log(alarm)
        var user = this;
        console.log('드렁옴??', user)
        user.alarm.push(alarm)
        user.save()
        cb(null, user)
    }
    return mongoose.model('User', userSchema)
}