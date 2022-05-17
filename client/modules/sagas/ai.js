import { put, call, takeLatest } from "redux-saga/effects"
import Router from 'next/router';
import { aiActions } from "../reducers/ai"
import { userActions } from "../reducers/user"
import { modelListApi } from "../../pages/api/ai"
import { useSelector, useDispatch } from 'react-redux'
import { joinApi, loginApi, logoutApi, alarmApi, delAlarmApi } from "../../pages/api/user"


function* modelList(dataAi){
    try{
        let token = dataAi.payload.token
        // if (token.length ===0) {
        //     console.log('업')
        //     const response = yield fetch("/api/aiToken", {
        //         method: "GET"
        //     });
        //     const tokeRes = yield response.json();
        //     console.log(tokeRes.token)
        //     token = tokeRes.token
        // } else {
        //     console.log('있')
        //     const response = yield fetch("/api/aiToken", {
        //         method: "GET"
        //     });

        // }
        const responseToken = yield fetch("/api/aiToken", {
            method: "GET"
        });
        const tokeRes = yield responseToken.json();
        token = tokeRes.token
        const responseAiList = yield fetch("/api/aiList", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "token": token,
            }),
        });
        const aiList = yield responseAiList.json();
        yield put(aiActions.modelListSuccess(aiList.models))

    }catch(error){
        yield put(aiActions.modelListFailure(error))
    }
}

export function* watchModelList(){
    yield takeLatest(aiActions.modelListRequest, modelList)
}

// videoRequest

function* video(data){
    try{
        const responseToken = yield fetch("/api/aiToken", {
            method: "GET"
        });
        const tokenRes = yield responseToken.json();
        let token = tokenRes.token

        const videoRes = yield fetch("/api/aiVideo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "language": data.payload.language,
                "text": data.payload.text,
                "model": data.payload.model,
                "token": token
            }),
        });
        const videoUrl = yield videoRes.json();
        const targetAlarm = data.payload.alarm
        const newAlarm = {}
        for (let i in targetAlarm){
            if (i !== "_id"){
                newAlarm[i] = targetAlarm[i]
            }
        }

        const addResponse = yield alarmApi({email:data.payload.email, ...newAlarm, mp4Url:videoUrl['mp4Url']})
        yield put(userActions.alarmSuccess(addResponse))
        yield put(aiActions.videoSuccess())

    }catch(error){
        yield put(aiActions.videoFailure(error))
    }
}

export function* watchvideo(){
    yield takeLatest(aiActions.videoRequest, video)
}