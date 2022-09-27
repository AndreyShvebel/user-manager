import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../../api/usersAPI";

export const create = createAsyncThunk(
    'user/create',
    async (userData) => {
        const { data, status } = await usersAPI.createUser(userData).then(response => {
            return response
        })
        return {data, status}
    }
)

const initialState = {
    status: 'loading',
    userInfo: {}
}

export const createUserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [create.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [create.fulfilled]: (state, action) => {
            state.status = action.payload.status
            state.success = true
            state.error = false
            state.userInfo = action.payload.data
        },
        [create.rejected]: (state, action) => {
            state.status = action.payload.status;
            state.success = false;
            state.error = true;
        }
    }
})

export default createUserSlice.reducer