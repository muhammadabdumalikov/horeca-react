import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCustomers, apiSeActivityCustomers } from 'services/SalesService'

export const getCustomers = createAsyncThunk(
    'crmCustomers/data/getCustomers',
    async (data) => {
        const response = await apiGetCustomers(data)
        return response.data
    }
)
export const inActiveUser = createAsyncThunk(
    'crmCustomers/data/inActiveUser',
    async (data) => {
        const response = await apiSeActivityCustomers(data)
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
    name: 'crmCustomers/data',
    initialState: {
        loading: false,
        customerList: [],
        statisticData: {},
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setCustomerList: (state, action) => {
            state.customerList = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getCustomers.fulfilled]: (state, action) => {
            state.customerList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getCustomers.pending]: (state) => {
            state.loading = true
        },
        [inActiveUser.fulfilled]: (state) => {
            state.loading = false
        },
        [inActiveUser.pending]: (state) => {
            state.loading = true
        },
        // [getCustomerStatistic.pending]: (state) => {
        //     state.statisticLoading = true
        // },
        // [getCustomerStatistic.fulfilled]: (state, action) => {
        //     state.statisticData = action.payload
        //     state.statisticLoading = false
        // },
    },
})

export const { setTableData, setCustomerList, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
