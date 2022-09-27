import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../../api/usersAPI";

export const getById = createAsyncThunk(
    'user/getById',
    async ({id, userToken}) => {
        const { data, status } = await usersAPI.getUserById(id, userToken).then(response => {
            return response
        })
        return {data, status}
    }
)

const initialState = {
    status: 'loading',
    userInfo: {}
}

export const getUserByIdSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [getById.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [getById.fulfilled]: (state, action) => {
            state.status = action.payload.status
            state.success = true
            state.error = false
            state.userInfo = action.payload.data
        },
        [getById.rejected]: (state, action) => {
            state.status = action.payload.status;
            state.success = false;
            state.error = true;
        }
    }
})

export default getUserByIdSlice.reducer