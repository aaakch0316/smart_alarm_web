import { put, takeLatest } from "redux-saga/effects"
import { joinApi, loginApi, logoutApi } from "../../pages/api/user"
import { userActions } from "../reducers/user"
import Router from 'next/router';




function* join(user){
    try{
        const response = yield joinApi(user.payload)
        yield put(userActions.joinSuccess(response))
        Router.push('/auth/login');

    }catch(error){
        yield put(userActions.joinFailure(error))
    }
}

export function* watchJoin(){
    yield takeLatest(userActions.joinRequest, join)
}

function* login(login){
    try{
        // console.log('들어옴')
        // console.log(login.payload)
        const response = yield loginApi(login.payload)
        // console.log('response')
        // console.log(response)
        // yield put(userActions.loginSuccess(response))
        // Router.push('/');
    }catch(error){
        yield put(userActions.loginFailure(error))
    }
}

export function* watchLogin(dd){
    // console.log('dd0', dd)
    yield takeLatest(userActions.loginRequest, login)
}

// function* logout(){
//     try{
//         const response = yield logoutApi()
//         yield put(userActions.logoutSuccess(response))
//     }catch(error){
//         console.log(error)
//     }
// }

// export function* watchLogout(){
//     yield takeLatest(userActions.logoutRequest, logout)
// }

// function* delUser(){
//     try{
//         const response = yield delUserApi()
//         yield put(userActions.delUserSuccess(response))
//     }catch(error){
//         console.log(error)
//     }
// }
// export function* watchDelUser(){
//     yield takeLatest(userActions.delUserRequest, delUser)
// }

