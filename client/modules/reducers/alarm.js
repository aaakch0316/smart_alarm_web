import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    data: [],
    error: null
}

const userSlice = createSlice({
    name: 'alarms',
    initialState,
    reducers: {
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
    }
})

const { reducer, actions } = userSlice;
export const userActions = actions;
export default reducer;