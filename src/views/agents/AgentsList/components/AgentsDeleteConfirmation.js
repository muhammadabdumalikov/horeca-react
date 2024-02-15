import React from 'react'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDeleteConfirmation } from '../store/stateSlice'

const ProductDeleteConfirmation = () => {
    const dispatch = useDispatch()
    const dialogOpen = useSelector(
        (state) => state.agentsList.state.deleteConfirmation
    )
    // const selectedCompany = useSelector(
    //     (state) => state.agentsList.state.selectedCompany
    // )
    // const tableData = useSelector(
    //     (state) => state.agentsList.data.tableData
    // )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="danger"
            title="Удалить товар"
            onCancel={onDialogClose}
            // onConfirm={onDelete}
            confirmButtonColor="red-600"
        >
            <p>
            Вы уверены, что хотите удалить этот товар? Все, что связано с записью
                к этому продукту также будут удалены. Это действие не может быть
                отменено.
            </p>
        </ConfirmDialog>
    )
}

export default ProductDeleteConfirmation
