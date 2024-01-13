import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiDeleteSalesCompany,
    apiGetSalesCompany,
} from 'services/SalesService'

export const getCompanies = createAsyncThunk(
    'salesCompanyList/data/getCompanies',
    async (data) => {
        const response = await apiGetSalesCompany(data)
        return response.data
    }
)

export const deleteCompany = async (data) => {
    const response = await apiDeleteSalesCompany(data)
    return response.data
}

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    limit: 10,
    search: '',
    in_active: true,
}

export const initialFilterData = {
    name: '',
    category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
    status: [0, 1, 2],
    productStatus: 0,
}

const dataSlice = createSlice({
    name: 'salesCompany/data',
    initialState: {
        loading: false,
        companyList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        updateCompanyList: (state, action) => {
            state.companyList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getCompanies.fulfilled]: (state, action) => {
            state.companyList = action.payload.data
            // state.tableData.total = action.payload.total
            state.loading = false
        },
        [getCompanies.pending]: (state) => {
            state.loading = true
        },
    },
})

export const {
    updateCompanyList,
    setTableData,
    setFilterData,
} = dataSlice.actions

export default dataSlice.reducer
