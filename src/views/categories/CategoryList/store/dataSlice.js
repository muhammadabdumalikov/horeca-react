import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiDeleteSalesCompany,
    apiGetCategory,
} from 'services/SalesService'

export const getCategories = createAsyncThunk(
    'categoryList/data/getCategories',
    async (data) => {
        const response = await apiGetCategory(data)
        return response.data
    }
)

export const deleteCompany = async (data) => {
    const response = await apiDeleteSalesCompany(data)
    return response.data
}

export const initialTableData = {
    total: 0,
    page: 1,
    pageSize: 10,
    limit: 10,
    search: '',
}

const dataSlice = createSlice({
    name: 'categoryList/data',
    initialState: {
        loading: false,
        categoryList: [],
        tableData: initialTableData,
    },
    reducers: {
        updateCategoryList: (state, action) => {
            state.companyList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: {
        [getCategories.fulfilled]: (state, action) => {
            state.categoryList = action.payload.data
            state.tableData.total = action.payload?.more_info?.pages
            state.tableData.page = action.payload?.more_info?.page
            state.tableData.pageSize = action.payload?.more_info?.count
            state.loading = false
        },
        [getCategories.pending]: (state) => {
            state.loading = true
        },
    },
})

export const {
    updateCategoryList,
    setTableData,
    setFilterData,
} = dataSlice.actions

export default dataSlice.reducer
