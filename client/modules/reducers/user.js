import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    data: [],
    error: null
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        joinRequest: (state, payload) => {
            state.loading = true;
        },
        joinSuccess: (state, {payload}) => {
            // state.data = [...state.data, payload]
            state.data = []
            state.loading = false;
        },
        joinFailure: (state, {payload}) => {
            state.data = payload;
            state.loading = false;
        },

        loginRequest(state, payload){
            // alert('loginRequest')
            state.loading = true;
        },
        loginSuccess: (state, {payload}) => {
            state.loading = false;
            state.data = [...state.data, payload]
        },
        loginFailure: (state, {payload}) => {
            state.loading = false;
            state.data = payload;
        },

        logoutRequest: (state, {payload}) => {
            state.loading = true;
        },
        logoutSuccess(state){
            state.loading = false;
            localStorage.clear();
            window.location.href = '/'
        },

        delUserRequest: (state, payload) => {
            state.loading = true
        },
        delUserSuccess(state, {payload}){
            state.data = [...state.data, payload]
            state.loading = false;
        },
        delUserFailure(state, {payload}){
            state.data = payload
            state.loading = false;
        },

        
        alarmRequest: (state, payload) => {
            state.loading = true;
        },
        alarmSuccess: (state, {payload}) => {
            state.data = [...state.data, payload]
            state.loading = false;
        },
        alarmFailure: (state, {payload}) => {
            state.data = payload;
            state.loading = false;
        },
        delAlarmRequest: (state, payload) => {
            state.loading = true;
        },
        delAlarmSuccess: (state, {payload}) => {
            state.data = [...state.data, payload]
            state.loading = false;
        },
        delAlarmFailure: (state, {payload}) => {
            state.data = payload;
            state.loading = false;
        },
    }
})

const { reducer, actions } = userSlice;
export const userActions = actions;
export default reducer;