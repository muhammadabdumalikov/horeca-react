import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSalesProduct,
    apiDeleteSalesProducts,
    apiUpdateCategory,
    apiGetCategoryById,
} from 'services/SalesService'

export const getProduct = createAsyncThunk(
    'salesProductEdit/data/getProducts',
    async (data) => {
        const response = await apiGetSalesProduct(data)
        return response.data
    }
)
export const getCategoryById = createAsyncThunk(
    'salesProductEdit/data/getCategoriesbyID',
    async (data) => {
        const response = await apiGetCategoryById(data)
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
        categoryItem: {},
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
        [getCategoryById.fulfilled]: (state, action) => {
            state.categoryItem = action.payload
            state.loading = false
        },
        [getCategoryById.pending]: (state) => {
            state.loading = true
        }
    },
})

export default dataSlice.reducer
