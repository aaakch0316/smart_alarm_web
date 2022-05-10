import { put, call, takeLatest } from "redux-saga/effects"
import Router from 'next/router';
import { userActions } from "../reducers/user"
import {getToken, setToken, removeToken} from "../../services/tokenService";
import { joinApi, loginApi, logoutApi } from "../../pages/api/user"





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
        
        const response = yield loginApi(login.payload)
        console.log('response')
        console.log(response.accessToken)
        yield call(setToken, response.accessToken)
        yield put(userActions.loginSuccess(response))
        Router.push('/');
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

