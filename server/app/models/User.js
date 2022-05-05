import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import applyDotenv from '../lambdas/applyDotenv.js'

export default function UserModel(mongoose) {
    const {jwtSecret} = applyDotenv(dotenv)

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
    userSchema.methods.generateToken = function (cb) {
        var user = this;
        // json web token 이용하여 token 생성하기 user id 와 두번째 param 으로 토큰을 만들고, param 을 이용하여
        // 나중에 userid를 찾아낸다.
        console.log(" jwtSecret >> " + jwtSecret)
        var token = jwt.sign(user._id.toHexString(), jwtSecret)

        user.token = token
        user.save(function (err, user) {
            if (err) 
                return cb(err);
            cb(null, user)
        })
    }
    return mongoose.model('User', userSchema)
}