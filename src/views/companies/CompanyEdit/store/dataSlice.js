import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCompany, apiUpdateCompany } from 'services/SalesService'

export const getCompany = createAsyncThunk(
    'salesCompanyEdit/data/apiGetCompany',
    async (data) => {
        const response = await apiGetCompany(data)
        return response.data
    }
)

export const updateCompany = async (data) => {
    const response = await apiUpdateCompany(data)
    return response.data
}

const dataSlice = createSlice({
    name: 'salesCompanyEdit/data',
    initialState: {
        loading: false,
        companyData: [],
    },
    reducers: {},
    extraReducers: {
        [getCompany.fulfilled]: (state, action) => {
            state.companyData = action.payload
            state.loading = false
        },
        [getCompany.pending]: (state) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer
