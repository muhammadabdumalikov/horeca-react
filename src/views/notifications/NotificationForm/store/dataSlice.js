import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCategory, apiGetCompany } from 'services/SalesService'

export const getCategory = createAsyncThunk(
    'productForm/data/getCatalog',
    async (data) => {
        const response = await apiGetCategory(data)
        return response.data
    }
)
export const getCompany = createAsyncThunk(
    'productForm/data/getCompany',
    async (data) => {
        const response = await apiGetCompany(data)
        return response.data
    }
)


// export const deleteProduct = async (data) => {
//     const response = await apiDeleteSalesProducts(data)
//     return response.data
// }

// export const initialTableData = {
//     total: 0,
//     pageIndex: 1,
//     pageSize: 10,
//     query: '',
//     sort: {
//         order: '',
//         key: '',
//     },
// }

// export const initialFilterData = {
//     name: '',
//     category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
//     status: [0, 1, 2],
//     productStatus: 0,
// }

const dataSlice = createSlice({
    name: 'productForm/data',
    initialState: {
        categoryList: [],
        companyList: [],
        // tableData: initialTableData,
        // filterData: initialFilterData,
    },
    reducers: {
        // updateProductList: (state, action) => {
        //     state.productList = action.payload
        // },
    },
    extraReducers: {
        [getCategory.fulfilled]: (state, action) => {
            state.categoryList = action.payload.data
        },
        [getCompany.fulfilled]: (state, action) => {
            state.companyList = action.payload.data
        },
       
    },
})

export const { updateProductList, setTableData, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
