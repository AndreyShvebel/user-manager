import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { token, usersAPI } from "../../api/usersAPI";

export const authorizeUser = createAsyncThunk(
    'user/authorize',
    async (userInfo) => {
        const { data, status } = await usersAPI.authorize(userInfo).then(response => {
            return response
        })
        return {data, status}
    }
)

const initialState = {
    status: 'loading',
    userToken: token
}

export const authorizeUserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: (state) => {
            state.userToken = null
            console.log(state.userToken)
            localStorage.clear()
        }
    },
    extraReducers: {
        [authorizeUser.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [authorizeUser.fulfilled]: (state, action) => {
            state.status = action.payload.status
            state.success = true
            state.error = false
            localStorage.setItem('token', action.payload.data.token)
            state.userToken = action.payload.data.token
        },
        [authorizeUser.rejected]: (state, action) => {
            state.status = action.payload.status;
            state.success = false;
            state.error = true;
        }
    }
})

export const { logout } = authorizeUserSlice.actions

export default authorizeUserSlice.reducer