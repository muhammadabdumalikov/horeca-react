import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetDelivers, apiGetOrders, apiUpdateOrderStatus } from 'services/SalesService'

export const getOrders = createAsyncThunk(
    'employesStore/data/getOrders',
    async (data) => {
        const response = await apiGetOrders(data)
        return response.data
    }
)

export const updateOrderStatus = createAsyncThunk(
    'employesStore/data/updateStatus',
    async (data) => {
        const response = await apiUpdateOrderStatus(data)
        return response.data
    }
)

export const getDelivers = createAsyncThunk(
    'employesStore/data/getDelivers',
    async (data) => {
        const response = await apiGetDelivers(data)
        return response.data
    }
)

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    // search: '',
    order_number: '',
    client_name: ''
}

export const initialFilterData = {
    status: '',
    paidStatus: '',

}

export const multipleSelect = {
    deliver: '',
    orderStatus: ''
}

const dataSlice = createSlice({
    name: 'employesStore/data',
    initialState: {
        loading: false,
        tableData: initialTableData,
        filterData: initialFilterData,
        ordersList: [],
        orderItem: {},
        deliversList: [],
        multipleSelect: multipleSelect
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setOrderItem: (state, action) => {
            state.orderItem = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        setMultipleSelect: (state, action) => {
            state.multipleSelect = action.payload
        },
    },
    extraReducers: {
        [getOrders.fulfilled]: (state, action) => {
            // console.log(action.payload.total_count, 'action.payload.total_count')
            state.ordersList = action.payload.data
            state.tableData.total = action.payload.total_count
            state.loading = false
        },
        [getOrders.pending]: (state) => {
            state.loading = true
        },
        [getDelivers.fulfilled]: (state, action) => {
            state.deliversList = action.payload.data
            state.loading = false
        },
        [getDelivers.pending]: (state) => {
            state.loading = true
        },
        [updateOrderStatus.fulfilled]: (state, action) => {
            state.loading = false
        },
        [updateOrderStatus.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { updateCompanyList, setTableData, setFilterData, setOrderItem, setMultipleSelect } =
    dataSlice.actions

export default dataSlice.reducer
