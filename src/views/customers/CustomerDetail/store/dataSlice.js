import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCustomerById } from 'services/SalesService'


export const getCustomerById = createAsyncThunk(
    'crmCustomerDetails/data/getCustomerById',
    async (data) => {
        const response = await apiGetCustomerById(data)
        return response.data
    }
)

// export const deleteCustomer = createAsyncThunk(
//     'crmCustomerDetails/data/deleteCustomer',
//     async (data) => {
//         const response = await apiDeleteCrmCustomer(data)
//         return response.data
//     }
// )

// export const putCustomer = createAsyncThunk(
//     'crmCustomerDetails/data/putCustomer',
//     async (data) => {
//         const response = await apPutCrmCustomer(data)
//         return response.data
//     }
// )

const dataSlice = createSlice({
    name: 'crmCustomerDetails/data',
    initialState: {
        loading: false,
        profileData: {},
        subscriptionData: [],
        paymentHistoryData: [],
        paymentMethodData: [],
    },
    reducers: {
        updatePaymentMethodData: (state, action) => {
            state.paymentMethodData = action.payload
        },
        updateProfileData: (state, action) => {
            state.profileData = action.payload
        },
    },
    extraReducers: {
        [getCustomerById.fulfilled]: (state, action) => {
            console.log(action.payload, 'action.payload')
            state.loading = false
            state.profileData = action.payload
            // state.subscriptionData = action.payload?.subscription || []
            // state.paymentHistoryData = action.payload?.orderHistory || []
            // state.paymentMethodData = action.payload?.paymentMethod || []
        },
        [getCustomerById.pending]: (state) => {
            state.loading = true
        },
        // [deleteCustomer.fulfilled]: () => {},
        // [putCustomer.fulfilled]: () => {},
       
    },
})

export const { updatePaymentMethodData, updateProfileData } = dataSlice.actions

export default dataSlice.reducer
