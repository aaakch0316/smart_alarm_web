import { combineReducers } from "redux";
import signinReducer from "./signin"

const rootReducer = combineReducers({
    signin: signinReducer,
})

export default rootReducer;