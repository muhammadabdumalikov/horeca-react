import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetPaymentHistory } from 'services/SalesService'

export const getPaymentHistory = createAsyncThunk(
    'employesStore/data/getPaymentHistory',
    async (data) => {
        const response = await apiGetPaymentHistory(data)
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
        debtUsersList: [],
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getPaymentHistory.fulfilled]: (state, action) => {
            state.debtUsersList = action.payload.data
            state.tableData.total = action.payload.total_count
            state.loading = false
        },
        [getPaymentHistory.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { updateCompanyList, setTableData, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
