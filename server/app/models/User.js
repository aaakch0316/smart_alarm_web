import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'
// import applyDotenv from '../lambdas/applyDotenv.js'

export default function UserModel(mongoose) {
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
    })
    return mongoose.model('User', userSchema)
}