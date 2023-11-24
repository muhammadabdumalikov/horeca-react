import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'salesCompanyList/state',
    initialState: {
        deleteConfirmation: false,
        selectedCompany: '',
    },
    reducers: {
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedCompany: (state, action) => {
            state.selectedCompany = action.payload
        },
    },
})

export const { toggleDeleteConfirmation, setSelectedCompany } =
    stateSlice.actions

export default stateSlice.reducer
