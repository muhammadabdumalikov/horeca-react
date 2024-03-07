import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetRegions, apiUpdateAgent } from 'services/SalesService'

export const getRegions = createAsyncThunk(
    'xprovidersStore/data/getRegions',
    async (data) => {
        const response = await apiGetRegions(data)
        return response.data
    }
)


const dataSlice = createSlice({
    name: 'xprovidersStore/data',
    initialState: {
        loading: false,
        regionsList: [],
    },
    reducers: {},
    extraReducers: {
        [getRegions.fulfilled]: (state, action) => {
            state.regionsList = action.payload
            state.loading = false
        },
        [getRegions.pending]: (state) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer
