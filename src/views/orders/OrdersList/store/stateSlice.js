import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'salesCompanyList/state',
    initialState: {
        deleteConfirmation: false,
        selectedCompany: '',
        selectedRows: [],
        selectedRow: [],
    },
    reducers: {
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedCompany: (state, action) => {
            state.selectedCompany = action.payload
        },
        setSelectedRows: (state, action) => {
            state.selectedRows = action.payload
        },
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload
        },
        addRowItem: (state, { payload }) => {
            payload.forEach((userId) => {
                if (!state.selectedRows.includes(userId)) {
                    state.selectedRows.push(userId)
                }
            })
        },
        removeRowItem: (state, { payload }) => {
            const index = state.selectedRows.indexOf(payload)
            if (index !== -1) {
                state.selectedRows.splice(index, 1)
            }
        },
    },
})

export const {
    toggleDeleteConfirmation,
    setSelectedCompany,
    setSelectedRows,
    setSelectedRow,
    addRowItem,
    removeRowItem,
} = stateSlice.actions

export default stateSlice.reducer
