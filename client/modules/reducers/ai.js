import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    language: "",
    text: "",
    model: "",
    token: "",
    modelList: [],
    url : "",
    loading: false
}

const aiSlice = createSlice({
    name: 'ais',
    initialState,
    reducers: {
        modelListRequest: (state, payload) => {
            state.loading = true;
        },
        modelListSuccess: (state, {payload}) => {
            state.loading = false;
            state.modelList = payload

        },
        modelListFailure: (state, payload) => {
            state.loading = false;
        },
        videoRequest: (state, payload) => {
            state.loading = true;
        },
        videoSuccess: (state, payload) => {
            // state.loading = payload.loading;
            // state.url = payload.url
            state.loading = false;
        },
        videoFailure: (state, payload) => {
            state.loading = false;
        },
        tokenRequest: (state, payload) => {
            state.loading = true;
        },
        tokenSuccess: (state, payload) => {
            state.loading = false;
            state.token = payload.token
        },
        tokenFailure: (state, payload) => {
            state.loading = false;
        },
    }
})

const {reducer, actions} = aiSlice;
export const aiActions = actions;
export default reducer;