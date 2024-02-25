import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetOrderById, apiUpdateEmploye } from 'services/SalesService'

export const getOrderById = createAsyncThunk(
    'ordersStoreEdit/data/getOrderById',
    async (data) => {
        const response = await apiGetOrderById(data)
        return response.data
    }
)

export const updateEmploye = async (data) => {
    const response = await apiUpdateEmploye(data)
    return response.data
}

const dataSlice = createSlice({
    name: 'ordersStoreEdit/data',
    initialState: {
        loading: false,
        ordersItem: {},
    },
    reducers: {},
    extraReducers: {
        [getOrderById.fulfilled]: (state, action) => {
            state.agentsList = action.payload
            state.loading = false
        },
        [getOrderById.pending]: (state) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer
