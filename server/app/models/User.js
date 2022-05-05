// import bcrypt from 'bcrypt' // 중요
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
    }, {timestamps: true})
    return mongoose.model('User', userSchema)
}