import { configureStore } from "@reduxjs/toolkit";
import authorizeUserSlice from './slices/authorizeUserSlice';
import getUsersListSlice from './slices/getUsersListSlice';
import getUserByIdSlice from './slices/getUserByIdSlice';
import createUserSlice from "./slices/createUserSlice";
import modifyUserSlice from "./slices/modifyUserSlice";

export const store = configureStore({
    reducer: {
        authorizeUser: authorizeUserSlice,
        getUsersList: getUsersListSlice,
        getUserById: getUserByIdSlice,
        createUser: createUserSlice,
        modifyUser: modifyUserSlice
    }
})