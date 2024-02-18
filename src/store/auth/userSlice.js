import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetUserInfoByToken } from 'services/AuthService'

export const getUserInfoByToken = createAsyncThunk(
    'auth/data/getEmployesById',
    async (data) => {
        const response = await apiGetUserInfoByToken(data)
        return response.data
    }
) 

export const initialState = {
    avatar: '',
    userName: '',
    email: '',
    authority: [],
}

export const userSlice = createSlice({
    name: 'auth/user',
    initialState,
    userInfo: {},
    reducers: {
        setUser: (_, action) => action.payload,
        userLoggedOut: () => initialState,
    },
    extraReducers: {
        [getUserInfoByToken.fulfilled]: (state, action) => {
            state.userInfo = action.payload
        },
    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
