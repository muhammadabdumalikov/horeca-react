import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import {
    setDeleteMode,
    setSelectedRow,
    setSelectedRows,
} from '../store/stateSlice'
import { deleteOrders, getCustomers, getFaktura } from '../store/dataSlice'

const OrderDeleteConfirmation = () => {
    const dispatch = useDispatch()
    const selectedRows = useSelector(
        (state) => state.fakturaStore.state.selectedRows
    )
    const selectedRow = useSelector(
        (state) => state.fakturaStore.state.selectedRow
    )
    const deleteMode = useSelector(
        (state) => state.fakturaStore.state.deleteMode
    )
    const tableData = useSelector(
        (state) => state.fakturaStore.data.tableData
    )

    const onDialogClose = () => {
        dispatch(setDeleteMode(''))

        if (deleteMode === 'single') {
            dispatch(setSelectedRow([]))
        }
    }

    console.log(selectedRow, 'selectedRow')

    const onDelete = async () => {
        dispatch(setDeleteMode(''))

        if (deleteMode === 'single') {
            const success = await getFaktura({ user_ids: selectedRow })
            deleteSucceed(success)
            dispatch(setSelectedRow([]))
        }

        if (deleteMode === 'batch') {
            const success = await getFaktura({ user_ids: selectedRows })
            deleteSucceed(success, selectedRows.length)
            dispatch(setSelectedRows([]))
        }
    }

    const deleteSucceed = (success, orders) => {
        if (success) {
            dispatch(getCustomers(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    {deleteMode === 'single' && 'Order '}
                    {deleteMode === 'batch' && `${orders} orders `}
                    successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={deleteMode === 'single' || deleteMode === 'batch'}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="info"
            title="Фактура"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmButtonColor="blue-600"
            confirmText='Получить фактуру'
        >
            <p>
                Are you sure you want to delete this order? All record related
                to this order will be deleted as well. This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default OrderDeleteConfirmation
