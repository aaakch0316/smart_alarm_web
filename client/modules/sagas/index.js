import { all } from 'redux-saga/effects'
// import { watchAddBoard, watchDelBoard, watchUpdateBoard } from './boardSaga.js'
import { watchJoin, watchLogout, watchDelUser, watchLogin, watchalarm } from './user.js'

export default function* rootSaga() {
    yield all([
        watchJoin(), 
        watchLogin(), 
        watchalarm()
        // watchLogout(), 
        // watchDelUser()
    ])
}
