import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../models/User/user";

type initialStateType = {
    userList: IUser[]
}

const userList: IUser[] = JSON.parse(localStorage.getItem('user') as string) ?? [];

const initialState: initialStateType = {
    userList
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<IUser>) => {
            state.userList?.push(action.payload)
        },
        updateUser: (state, action: PayloadAction<IUser>) => {
            const {
                payload: {user_name, user_id, user_email, user_address},
                } = action;
            state.userList = state.userList.map((user) => 
                user.user_id === user_id ? {...user, user_name, user_email, user_address} : user
            )
            localStorage.setItem('user', JSON.stringify(state.userList))
        },
        deleteUser: (state, action: PayloadAction<{id: string}>) => {
            const newArr = state.userList.filter((user) => user.user_id !== action.payload)
            localStorage.setItem('user', JSON.stringify(newArr))
            state.userList = newArr
        }
    }
})

export const {addNewUser, updateUser, deleteUser} = userSlice.actions;

export default userSlice.reducer;