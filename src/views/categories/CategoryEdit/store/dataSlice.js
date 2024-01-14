import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSalesProduct,
    apiDeleteSalesProducts,
    apiGetCategory,
    apiUpdateCategory,
} from 'services/SalesService'

export const getProduct = createAsyncThunk(
    'salesProductEdit/data/getProducts',
    async (data) => {
        const response = await apiGetSalesProduct(data)
        return response.data
    }
)
export const getCategories = createAsyncThunk(
    'salesProductEdit/data/getCategories',
    async (data) => {
        const response = await apiGetCategory(data)
        return response.data
    }
)

export const updateCategory = async (data) => {
    const response = await apiUpdateCategory(data)
    return response.status
}

export const deleteProduct = async (data) => {
    const response = await apiDeleteSalesProducts(data)
    return response.data
}

const dataSlice = createSlice({
    name: 'salesProductEdit/data',
    initialState: {
        loading: false,
        productData: [],
        categoryList: [],
    },
    reducers: {},
    extraReducers: {
        [getProduct.fulfilled]: (state, action) => {
            state.productData = action.payload
            state.loading = false
        },
        [getProduct.pending]: (state) => {
            state.loading = true
        },
        [getCategories.fulfilled]: (state, action) => {
            state.categoryList = action.payload.data
            state.loading = false
        },
        [getCategories.pending]: (state) => {
            state.loading = true
        }
    },
})

export default dataSlice.reducer
