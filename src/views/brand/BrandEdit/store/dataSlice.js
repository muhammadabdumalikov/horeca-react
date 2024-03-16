import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCompanyById, apiUpdateCompany } from 'services/SalesService'

export const getCompanyById = createAsyncThunk(
    'salesCompanyEdit/data/getCompanyById',
    async (data) => {
        const response = await apiGetCompanyById(data)
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
        companyItem: [],
    },
    reducers: {},
    extraReducers: {
        [getCompanyById.fulfilled]: (state, action) => {
            state.companyItem = action.payload
            state.loading = false
        },
        [getCompanyById.pending]: (state) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer
