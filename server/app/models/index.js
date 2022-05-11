import dotenv from 'dotenv'
import mongoose from 'mongoose'

import UserModel from './User.js'
// import AlarmModel from './Alarm.js'


mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dotenv.MONGO_URI   
db.User = new UserModel(mongoose)
// db.Alarm = new AlarmModel(mongoose)

export default db