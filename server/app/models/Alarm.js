// export default function AlarmModel(mongoose) {
//     const alarmSchema = mongoose.Schema({
//         alarmer: {
//             type: Objectid,
//             required: true,
//             ref: 'User'
//         },
//         // isCheck: {type: Boolean, required: true},
//         content: {type: String, required: true},
//         alertTime: {type: Date, required: true},
//         mp4Url: String
//     }, {timestamps: true})
//     return mongoose.model('Alarm', alarmSchema)
// }