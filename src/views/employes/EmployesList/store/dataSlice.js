import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetEmployes, apiPatchActivityEmployes } from 'services/SalesService'

export const getEmployes = createAsyncThunk(
    'employesStore/data/getEmployes',
    async (data) => {
        const response = await apiGetEmployes(data)
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
        employesList: [],
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
        [getEmployes.fulfilled]: (state, action) => {
            state.employesList = action.payload.data
            state.tableData.total = action.payload.total_count
            state.loading = false
        },
        [getEmployes.pending]: (state) => {
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

export const { updateCompanyList, setTableData, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
