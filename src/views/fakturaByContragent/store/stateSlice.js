import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

const stateSlice = createSlice({
    name: 'fakturaStore/state',
    initialState: {
        selectedRows: [],
        selectedRow: [],
        deleteMode: '',
        startDate: dayjs().subtract(3, 'days').toDate(),
        endDate: new Date(),
    },
    reducers: {
        setStartDate: (state, action) => {
            state.startDate = action.payload
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload
        },
        setSelectedRows: (state, action) => {
            state.selectedRows = action.payload
        },
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload
        },
        addRowItem: (state, { payload }) => {
            payload.forEach(userId => {
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
        setDeleteMode: (state, action) => {
            state.deleteMode = action.payload
        },
    },
})

export const {
    setSelectedRows,
    setSelectedRow,
    addRowItem,
    removeRowItem,
    toggleDeleteConfirmation,
    setDeleteMode,
    setStartDate,
    setEndDate
} = stateSlice.actions

export default stateSlice.reducer
