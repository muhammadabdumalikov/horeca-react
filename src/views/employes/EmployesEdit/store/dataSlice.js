import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {  apiGetEmployesById, apiUpdateEmploye } from 'services/SalesService'

export const getEmployesById = createAsyncThunk(
    'employesStore/data/getEmployesById',
    async (data) => {
        const response = await apiGetEmployesById(data)
        return response.data
    }
)

export const updateEmploye = async (data) => {
    const response = await apiUpdateEmploye(data)
    return response.data
}

const dataSlice = createSlice({
    name: 'salesAgentEdit/data',
    initialState: {
        loading: false,
        employeItem: {},
    },
    reducers: {},
    extraReducers: {
        [getEmployesById.fulfilled]: (state, action) => {
            state.agentsList = action.payload
            state.loading = false
        },
        [getEmployesById.pending]: (state) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer
