import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetFakturaByContragent, apiGetFakturaOrder, apiSetFakturaArchive } from 'services/SalesService'

export const getFakturaByContagent = createAsyncThunk(
    'fakturaStore/data/getFakturaByContagent',
    async (data) => {
        const response = await apiGetFakturaByContragent(data)
        return response.data
    }
)

export const setFakturaArchive = async (data) => {
    const response = await apiSetFakturaArchive(data)
    return response.data
}

export const getFaktura = async (data) => {
    const response = await apiGetFakturaOrder(data)
    return response.data
}

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
}

const dataSlice = createSlice({
    name: 'fakturaStore/data',
    initialState: {
        loading: false,
        orderList: [],
        tableData: initialTableData,
        fakturaItem: [],
        fakturaByContragentList: [],
        status: 'false'
    },
    reducers: {
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setStatus: (state, action) => {
            state.status = action.payload
        },
    },
    extraReducers: {
      
        [getFakturaByContagent.fulfilled]: (state, action) => {
            state.fakturaByContragentList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getFakturaByContagent.pending]: (state) => {
            state.loading = true
        },
        [getFaktura.fulfilled]: (state, action) => {
            state.fakturaItem = action.payload
            state.loading = false
        },
        [getFaktura.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setOrderList, setTableData, setStatus } = dataSlice.actions

export default dataSlice.reducer
