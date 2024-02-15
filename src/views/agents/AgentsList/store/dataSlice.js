import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAgents, apiGetCompany, apiInactiveAgent } from 'services/SalesService'

export const getCompanies = createAsyncThunk(
    'agentsList/data/getCompanies',
    async (data) => {
        const response = await apiGetCompany(data)
        return response.data
    }
)
export const getAgents = createAsyncThunk(
    'agentsList/data/getAgents',
    async (data) => {
        const response = await apiGetAgents(data)
        return response.data
    }
)
export const inActiveAgent = createAsyncThunk(
    'agentsList/data/inActiveAgent',
    async (data) => {
        const response = await apiInactiveAgent(data)
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
    name: '',
    category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
    status: [0, 1, 2],
    productStatus: 0,
    status: '',
}

const dataSlice = createSlice({
    name: 'agentsList/data',
    initialState: {
        loading: false,
        companyList: [],
        agentsList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        updateCompanyList: (state, action) => {
            state.companyList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getCompanies.fulfilled]: (state, action) => {
            state.companyList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getCompanies.pending]: (state) => {
            state.loading = true
        },
        [getAgents.fulfilled]: (state, action) => {
            state.agentsList = action.payload.data
            state.tableData.total = action.payload.data.more_info.count
            state.loading = false
        },
        [getAgents.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { updateCompanyList, setTableData, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
