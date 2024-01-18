import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAgents, apiUpdateAgent } from 'services/SalesService'

export const getAgents = createAsyncThunk(
    'salesAgentEdit/data/getAgents',
    async (data) => {
        const response = await apiGetAgents(data)
        return response.data
    }
)

export const updateAgent = async (data) => {
    const response = await apiUpdateAgent(data)
    return response.data
}

const dataSlice = createSlice({
    name: 'salesAgentEdit/data',
    initialState: {
        loading: false,
        agentsList: [],
    },
    reducers: {},
    extraReducers: {
        [getAgents.fulfilled]: (state, action) => {
            state.agentsList = action.payload
            state.loading = false
        },
        [getAgents.pending]: (state) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer
