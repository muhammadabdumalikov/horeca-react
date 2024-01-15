import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSalesProducts,
    apiDeleteSalesProducts,
    apiGetCategory,
    apiGetCompany,
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

export const deleteProduct = async (data) => {
    const response = await apiDeleteSalesProducts(data)
    return response.data
}

export const initialTableData = {
    total: 0,
    page: 1,
    pageSize: 10,
    search: '',
    // sort: {
    //     order: '',
    //     key: '',
    // },
}

export const initialFilterData = {
    inActive: true,
    categoryId: null,
    companyId: null,
}

const dataSlice = createSlice({
    name: 'salesProductList/data',
    initialState: {
        loading: false,
        productList: [],
        categoryList: [],
        companyList: [],
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
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getProducts.pending]: (state) => {
            state.loading = true
        },
        [getCategory.fulfilled]: (state, action) => {
            console.log('ok')
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
