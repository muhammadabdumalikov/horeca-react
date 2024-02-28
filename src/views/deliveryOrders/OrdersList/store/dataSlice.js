import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetDeliveryOrders } from 'services/SalesService'

export const getDeliveryOrders = createAsyncThunk(
    'employesStore/data/getDeliveryOrders',
    async (data) => {
        const response = await apiGetDeliveryOrders(data)
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
    status: '',
}

const dataSlice = createSlice({
    name: 'employesStore/data',
    initialState: {
        loading: false,
        tableData: initialTableData,
        filterData: initialFilterData,
        ordersList: [],
        orderItem: {}
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
    },
    extraReducers: {
        [getDeliveryOrders.fulfilled]: (state, action) => {
            state.ordersList = action.payload.data
            state.tableData.total = action.payload.total_count
            state.loading = false
        },
        [getDeliveryOrders.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { updateCompanyList, setTableData, setFilterData, setOrderItem } =
    dataSlice.actions

export default dataSlice.reducer
