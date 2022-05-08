import { all } from 'redux-saga/effects'
// import { watchAddBoard, watchDelBoard, watchUpdateBoard } from './boardSaga.js'
import { watchJoin, watchLogin, watchLogout, watchDelUser } from './user.js'

export default function* rootSaga() {
    yield all([
        watchJoin(), 
        watchLogin(), 
        watchLogout(), 
        watchDelUser(), 
        // watchAddBoard(), 
        // watchDelBoard(),
        // watchUpdateBoard()
    ])
}
