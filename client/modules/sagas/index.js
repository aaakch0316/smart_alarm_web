import { all } from 'redux-saga/effects'
// import { watchAddBoard, watchDelBoard, watchUpdateBoard } from './boardSaga.js'
import { watchJoin, watchLogout, watchDelUser, watchLogin, watchalarm, watchDelAlarm } from './user.js'
import { watchModelList, watchvideo } from './ai.js'


export default function* rootSaga() {
    yield all([
        watchJoin(), 
        watchLogin(), 
        watchalarm(),
        watchDelAlarm(),
        watchModelList(),
        watchvideo()
        // watchLogout(), 
        // watchDelUser()
    ])
}
