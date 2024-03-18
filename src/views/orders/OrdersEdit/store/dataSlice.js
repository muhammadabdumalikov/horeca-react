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
}



const dataSlice = createSlice({
    name: 'xordersStore/data',
    initialState: {
        loading: false,
        productList: [],
        deliversList: [],
        tableData: initialTableData,
        status: '',
        step: 1
    },
    reducers: {
        updateProductList: (state, action) => {
            state.productList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.status = action.payload.status
        },
        setStep: (state, action) => {
            state.step = action.payload
        },
    },
    extraReducers: {
        [getProductsByOrderId.fulfilled]: (state, action) => {
            console.log(action.payload.order_items, 'action.payload')
            state.productList = action.payload
            state.tableData.total = action.payload.order_items.length
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

export const { updateProductList, setTableData, setFilterData, setStep } =
    dataSlice.actions

export default dataSlice.reducer
