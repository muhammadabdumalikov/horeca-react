import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetNotifications,
    apiUpdateNotification,
} from 'services/SalesService'

export const getNotifications = createAsyncThunk(
    'salesNotificationEdit/data/getNotifications',
    async (data) => {
        const response = await apiGetNotifications(data)
        return response.data
    }
)

export const updateNotification = async (data) => {
    const response = await apiUpdateNotification(data)
    return response.data
}

const dataSlice = createSlice({
    name: 'salesNotificationEdit/data',
    initialState: {
        loading: false,
        notificationsList: [],
    },
    reducers: {},
    extraReducers: {
        [getNotifications.fulfilled]: (state, action) => {
            state.notificationsList = action.payload
            state.loading = false
        },
        [getNotifications.pending]: (state) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer
