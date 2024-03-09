import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAktSverka, apiGetCustomers } from 'services/SalesService'

export const getCustomers = createAsyncThunk(
    'fakturaStore/data/getCustomers',
    async (data) => {
        const response = await apiGetCustomers(data)
        return response.data
    }
)

// export const getFaktura = createAsyncThunk(
//     'fakturaStore/data/getFaktura',
//     async (data) => {
//         const response = await apiGetFaktura(data)
//         return response.data
//     }
// )

export const getFaktura = async (data) => {
    const response = await apiGetAktSverka(data)
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
        customersList: [],
        fakturaItem: []
    },
    reducers: {
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: {
        [getCustomers.fulfilled]: (state, action) => {
            state.orderList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getCustomers.pending]: (state) => {
            state.loading = true
        },
        [getFaktura.fulfilled]: (state, action) => {
            console.log(action.payload, 'action.payload')
            state.fakturaItem = action.payload
            state.loading = false
        },
        [getFaktura.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setOrderList, setTableData } = dataSlice.actions

export default dataSlice.reducer
