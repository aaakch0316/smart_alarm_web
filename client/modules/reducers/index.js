import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper' 
import users from './user.js'  

const rootReducer = (state, action) => {
    if (action.type === HYDRATE) { 
        return {
          ...state,
          ...action.payload,
        };
    }
    return combineReducers({
        users,
        // boards
    })(state, action) 
}

export default rootReducer;