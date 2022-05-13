import { put, call, takeLatest } from "redux-saga/effects"
import Router from 'next/router';
import { aiActions } from "../reducers/ai"
import { modelListApi } from "../../pages/api/ai"
import { useSelector, useDispatch } from 'react-redux'


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