import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'xordersStore/state',
    initialState: {
        deleteConfirmation: false,
        editConfirmation: false,
        editOrderStep: false,
        selectedProduct: '',
    },
    reducers: {
        toggleEditOrderStep: (state, action) => {
            state.editOrderStep = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        toggleEditConfirmation: (state, action) => {
            state.editConfirmation = action.payload
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
    },
})

export const { toggleDeleteConfirmation, setSelectedProduct, toggleEditConfirmation, toggleEditOrderStep } =
    stateSlice.actions

export default stateSlice.reducer
