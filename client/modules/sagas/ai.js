import { put, call, takeLatest } from "redux-saga/effects"
import Router from 'next/router';
import { aiActions } from "../reducers/ai"
import { userActions } from "../reducers/user"
import { modelListApi } from "../../pages/api/ai"
import { useSelector, useDispatch } from 'react-redux'
import { joinApi, loginApi, logoutApi, alarmApi, delAlarmApi } from "../../pages/api/user"


function* modelList(dataAi){
    try{
        console.log('modelList saga 들어옴') 
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
        console.log(11)
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
        console.log(aiList.models)
        yield put(aiActions.modelListSuccess(aiList.models))

    }catch(error){
        console.log(error)
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
        console.log('token', tokenRes)
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
        console.log(videoUrl)
        console.log(videoUrl['mp4Url'])
        console.log(data.payload.alarm)
        console.log(data.payload.email)
        const targetAlarm = data.payload.alarm
        console.log(targetAlarm)
        const newAlarm = {}
        for (let i in targetAlarm){
            if (i !== "_id"){
                console.log(i)
                newAlarm[i] = targetAlarm[i]
            }
        }
        console.log(newAlarm)

        const addResponse = yield alarmApi({email:data.payload.email, ...newAlarm, mp4Url:videoUrl['mp4Url']})
        yield put(userActions.alarmSuccess(addResponse))


        // const delResponse = yield delAlarmApi({_id:targetAlarm._id, email:data.payload.email})
        // yield put(userActions.delAlarmSuccess(delResponse))

        // yield put(aiActions.videoSuccess(aiList.models)) 

    }catch(error){
        console.log(error)
        yield put(aiActions.videoFailure(error))
    }
}

export function* watchvideo(){
    yield takeLatest(aiActions.videoRequest, video)
}