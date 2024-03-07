import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSalesProducts,
    apiGetCategory,
    apiGetCompany,
    apiInActiveProdct,
} from 'services/SalesService'

export const getProducts = createAsyncThunk(
    'salesProductList/data/getProducts',
    async (data) => {
        const response = await apiGetSalesProducts(data)
        return response.data
    }
)
export const getCategory = createAsyncThunk(
    'salesProductList/data/getCatalog',
    async (data) => {
        const response = await apiGetCategory(data)
        return response.data
    }
)
export const getCompany = createAsyncThunk(
    'salesProductList/data/getCompany',
    async (data) => {
        const response = await apiGetCompany(data)
        return response.data
    }
)
export const inActiveProdct = createAsyncThunk(
    'salesProductList/data/inActiveProdct',
    async (data) => {
        const response = await apiInActiveProdct(data)
        return response.data
    }
)


export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    search: '',
}

export const initialFilterData = {
    is_deleted: false,
    category_id: null,
    company_id: null,
}

const dataSlice = createSlice({
    name: 'salesProductList/data',
    initialState: {
        loading: false,
        productList: [],
        categoryList: [],
        companyList: [],
        employesList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        updateProductList: (state, action) => {
            state.productList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {

        [getProducts.fulfilled]: (state, action) => {
            state.productList = action.payload.data
            state.tableData.total = action.payload.total_count
            state.loading = false
        },
        [getProducts.pending]: (state) => {
            state.loading = true
        },
        [getCategory.fulfilled]: (state, action) => {
            state.categoryList = action.payload.data
        },
        [getCompany.fulfilled]: (state, action) => {
            state.companyList = action.payload.data
        },
    },
})

export const {
    updateProductList,
    setTableData,
    setFilterData,
} = dataSlice.actions

export default dataSlice.reducer
