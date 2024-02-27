import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetOrders, apiPatchActivityEmployes } from 'services/SalesService'

export const getOrders = createAsyncThunk(
    'employesStore/data/getOrders',
    async (data) => {
        const response = await apiGetOrders(data)
        return response.data
    }
)

export const patchActivityEmployes = createAsyncThunk(
    'employesStore/data/patchActivityEmployes',
    async (data) => {
        const response = await apiPatchActivityEmployes(data)
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
        [getOrders.fulfilled]: (state, action) => {
            state.ordersList = action.payload.data
            state.tableData.total = action.payload.total_count
            state.loading = false
        },
        [getOrders.pending]: (state) => {
            state.loading = true
        },
        [patchActivityEmployes.fulfilled]: (state, action) => {
            state.loading = false
        },
        [patchActivityEmployes.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { updateCompanyList, setTableData, setFilterData, setOrderItem } =
    dataSlice.actions

export default dataSlice.reducer
