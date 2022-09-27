import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../../api/usersAPI";

export const modify = createAsyncThunk(
    'user/modify',
    async (userData) => {
        const { data, status } = await usersAPI.modifyUser(userData).then(response => {
            return response
        })
        return {data, status}
    }
)

const initialState = {
    status: 'loading',
    userInfo: {}
}

export const modifyUserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [modify.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [modify.fulfilled]: (state, action) => {
            state.status = action.payload.status
            state.success = true
            state.error = false
            state.userInfo = action.payload.data
        },
        [modify.rejected]: (state, action) => {
            state.status = action.payload.status;
            state.success = false;
            state.error = true;
        }
    }
})

export default modifyUserSlice.reducer