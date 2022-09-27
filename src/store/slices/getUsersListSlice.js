import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { usersAPI } from "../../api/usersAPI";

export const getUsersList = createAsyncThunk(
    'user/getList',
    async (userToken) => {
        const { data, status } = await usersAPI.getUsers(userToken).then(response => {
            return response
        })
        return {data, status}
    }
)

const initialState = {
    status: 'loading',
    usersList: [],
    usersListCopy: []
}

export const getUsersListSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        ascendingSort: (state) => {
            state.usersList = _.orderBy(state.usersList, 'id')
        },
        descendingSort: (state) => {
            state.usersList = _.orderBy(state.usersList, 'id').reverse()
        },
        search: (state,  action) => {
            state.usersList = state.usersListCopy
            state.usersList = _.filter(state.usersList, (user) => {
                if (user.username.substring(0, action.payload.length) === action.payload)
                {
                    return user.username
                }
            })
        }
    },
    extraReducers: {
        [getUsersList.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [getUsersList.fulfilled]: (state, action) => {
            state.status = action.payload.status
            state.success = true
            state.error = false
            state.usersList = action.payload.data
            state.usersListCopy = action.payload.data
        },
        [getUsersList.rejected]: (state, action) => {
            state.status = action.payload.status;
            state.success = false;
            state.error = true;
        }
    }
})

export const { ascendingSort, descendingSort, search } = getUsersListSlice.actions

export default getUsersListSlice.reducer