import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCategory,
    apiInActiveCategory,
} from 'services/SalesService'

export const getCategories = createAsyncThunk(
    'categoryList/data/getCategories',
    async (data) => {
        const response = await apiGetCategory(data)
        return response.data
    }
)
export const inActiveCategory = createAsyncThunk(
    'salesProductEdit/data/inActiveCategory',
    async (data) => {
        const response = await apiInActiveCategory(data)
        return response.data
    }
)

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    limit: 10,
    search: '',
    status: '',
}

export const statusFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'categoryList/data',
    initialState: {
        loading: false,
        categoryList: [],
        tableData: initialTableData,
        filterData: statusFilterData,
    },
    reducers: {
        updateCategoryList: (state, action) => {
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
        [getCategories.fulfilled]: (state, action) => {
            state.categoryList = action.payload.data
            state.tableData.total = action.payload.total_count
            state.loading = false
        },
        [getCategories.pending]: (state) => {
            state.loading = true
        },
        [inActiveCategory.fulfilled]: (state, action) => {
            state.categoryList = action.payload.data
            state.loading = false
        },
        [inActiveCategory.pending]: (state) => {
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
