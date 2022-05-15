import { put, call, takeLatest } from "redux-saga/effects"
import Router from 'next/router';
import { userActions } from "../reducers/user"
import {getToken, setToken, removeToken} from "../../services/tokenService";
import { joinApi, loginApi, logoutApi, alarmApi, delAlarmApi } from "../../pages/api/user"


function* alarm(data){
    try{

        const response = yield alarmApi(data.payload)
        yield put(userActions.alarmSuccess(response))
        Router.push('/');

    }catch(error){
        yield put(userActions.alarmFailure(error))
    }
}

export function* watchalarm(){
    yield takeLatest(userActions.alarmRequest, alarm)
}

function* delAlarm(data){
    try{

        const response = yield delAlarmApi(data.payload)
        yield put(userActions.delAlarmSuccess(response))

    }catch(error){
        yield put(userActions.delAlarmFailure(error))
    }
}

export function* watchDelAlarm(){
    yield takeLatest(userActions.delAlarmRequest, delAlarm)
}


function* join(user){
    try{

        let alarmList = []
        let data = user.payload
        user.payload.feature.map(val => {
            if (val === '고혈압') {
                alarmList.push({
                    content:'혈압잴 시간이예요', alerthour:'18', alertmin: '00', email: data.email
                })
            } else if (val === '당뇨병') {
                alarmList.push({
                    content:'주사 놓을 시간이예요', alerthour:'15', alertmin: '00', email: data.email
                })
            } else if (val === '고지혈증') {
                alarmList.push({
                    content:'운동할 시간이예요', alerthour:'11', alertmin: '00', email: data.email
                })
            } else if (val === '관절염') {
                alarmList.push({
                    content:'관절약 먹을 시간이예요', alerthour:'10', alertmin: '00', email: data.email
                })
            } else {
                alarmList.push({
                    content:'치매약 먹을 시간이예요', alerthour:'08', alertmin: '00', email: data.email
                })
            }
        })
        data['alarm'] = alarmList
        const response = yield joinApi(data)
        yield put(userActions.joinSuccess(response))
        yield Router.push('/auth/login');

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
        yield call(setToken, response.accessToken)
        yield put(userActions.loginSuccess(response))
        yield Router.push('/');
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

