import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetDelivers, apiGetProductsByOrderId, apiUpdateOrderDeliver } from 'services/SalesService'

export const getProductsByOrderId = createAsyncThunk(
    'xordersStore/data/getProductsByOrderId',
    async (data) => {
        const response = await apiGetProductsByOrderId(data)
        return response.data
    }
)
export const getDelivers = createAsyncThunk(
    'xordersStore/data/getDelivers',
    async (data) => {
        const response = await apiGetDelivers(data)
        return response.data
    }
)
export const updateOrderDeliver = createAsyncThunk(
    'xordersStore/data/updateOrderDeliver',
    async (data) => {
        const response = await apiUpdateOrderDeliver(data)
        return response.data
    }
)



// export const deleteProduct = async (data) => {
//     const response = await apiDeleteSalesProducts(data)
//     return response.data
// }

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    name: '',
    category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
    status: [0, 1, 2],
    productStatus: 0,
}

const dataSlice = createSlice({
    name: 'xordersStore/data',
    initialState: {
        loading: false,
        productList: [],
        deliversList: [],
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
        [getProductsByOrderId.fulfilled]: (state, action) => {
            state.productList = action.payload
            state.tableData.total = action.payload.total_count
            state.loading = false
        },
        [getProductsByOrderId.pending]: (state) => {
            state.loading = true
        },
        [getDelivers.fulfilled]: (state, action) => {
            state.deliversList = action.payload.data
            state.loading = false
        },
        [getDelivers.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { updateProductList, setTableData, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
