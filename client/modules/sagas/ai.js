import { put, call, takeLatest } from "redux-saga/effects"
import Router from 'next/router';
import { aiActions } from "../reducers/ai"
import { modelListApi } from "../../pages/api/ai"


function* modelList(){
    try{
        console.log('modelList saga 들어옴') 

        const response = yield modelListApi()
        // yield put(aiActions.modelListSuccess(response))
        console.log(response)

    }catch(error){
        console.log(error)
        yield put(aiActions.modelListFailure(error))
    }
}

export function* watchModelList(){
    yield takeLatest(aiActions.modelListRequest, modelList)
}