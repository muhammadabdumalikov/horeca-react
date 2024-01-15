import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetNotifications, apiInactiveNotiofication } from 'services/SalesService'

export const getNotifications = createAsyncThunk(
    'salesNotification/data/getNotifications',
    async (data) => {
        const response = await apiGetNotifications(data)
        return response.data
    }
)
export const inActiveNotification = createAsyncThunk(
    'salesNotification/data/inActiveNotification',
    async (data) => {
        const response = await apiInactiveNotiofication(data)
        return response.data
    }
)

export const initialTableData = {
    total: 0,
    page: 1,
    pageSize: 10,
    search: '',
}

export const initialFilterData = {
    inActive: true,
    categoryId: null,
    companyId: null,
}

const dataSlice = createSlice({
    name: 'salesNotification/data',
    initialState: {
        loading: false,
        notificationsList: [],
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
        [getNotifications.fulfilled]: (state, action) => {
            state.notificationsList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getNotifications.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { updateProductList, setTableData, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
