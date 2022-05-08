import { all, put, takeLatest } from "redux-saga/effects";
import * as t from "../types";

function* signin() {
    try {
		const response = yield fetch("/api/signin", {
			method: "GET"
		});
        console.log("response 확인", response.data)
		yield put({
			type: t.SIGNIN_SUCCEESS,
			payload: response,
		})

        const response2 = yield response.json();
        console.log(response2.data.token)
        localStorage.setItem("access_token", response2.data.token)
	
	} catch (error) {
		yield put({
			type: t.SIGNIN_FAIL,
			payload: error.message,
		});
	}
}

function* watchSignin() {
	yield takeLatest(t.SIGNIN_REQUEST, signin);
}

export default function* rootSaga() {
	yield all([
		watchSignin(),	
	]);
}