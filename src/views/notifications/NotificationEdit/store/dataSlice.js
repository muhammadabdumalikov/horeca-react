import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetNotificationById,
    apiUpdateNotification,
} from 'services/SalesService'

export const getNotificationById = createAsyncThunk(
    'salesNotificationEdit/data/getNotificationById',
    async (data) => {
        const response = await apiGetNotificationById(data)
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
        [getNotificationById.fulfilled]: (state, action) => {
            state.notificationsList = action.payload
            state.loading = false
        },
        [getNotificationById.pending]: (state) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer
