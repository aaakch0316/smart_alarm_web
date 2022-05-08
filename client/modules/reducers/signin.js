import { HYDRATE } from "next-redux-wrapper";
import * as t from "../types";

const initialState = {
    token: '',
    loading: false
}

function* signinReducer(state=initialState, action) {
    switch (action.type) {
        case HYDRATE:
			return { ...state, ...action.payload };
        case t.SIGNIN_REQUEST:
            return {
                ...state, token: action.payload
            }
        default:
            return state;
    }
}

export default signinReducer;