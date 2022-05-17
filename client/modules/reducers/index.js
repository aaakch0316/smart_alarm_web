import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper' 
import users from './user.js'  
import ais from './ai.js'

const rootReducer = (state, action) => {
    if (action.type === HYDRATE) { 
        return {
          ...state,
          ...action.payload,
        };
    }
    return combineReducers({
        users,
        ais
    })(state, action) 
}

export default rootReducer;