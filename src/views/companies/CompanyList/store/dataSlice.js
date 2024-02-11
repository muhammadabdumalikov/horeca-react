import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiDeleteSalesCompany,
    apiGetCompany,
    apiInactiveCompany,
} from 'services/SalesService'

export const getCompanies = createAsyncThunk(
    'salesCompanyList/data/getCompanies',
    async (data) => {
        const response = await apiGetCompany(data)
        return response.data
    }
)
export const inActiveCompany = createAsyncThunk(
    'salesCompanyList/data/inActiveCompany',
    async (data) => {
        const response = await apiInactiveCompany(data)
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
    pageSize: 10,
    limit: 10,
    search: '',
}

export const initialFilterData = {
    name: '',
    category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
    productStatus: 0,
    status: '',
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
            state.tableData.total = action.payload.total_count
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
