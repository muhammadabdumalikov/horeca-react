import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import {
    setDeleteMode,
    setSelectedRow,
    setSelectedRows,
} from '../store/stateSlice'
import { getCustomers, getFaktura } from '../store/dataSlice'
import dayjs from 'dayjs'
import { generateExcel } from './FakturaExelPattern'

const FakturaGetConfirmation = () => {
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
    const tableData = useSelector((state) => state.fakturaStore.data.tableData)

    const startDate = useSelector((state) => state.fakturaStore.state.startDate)
    const endDate = useSelector((state) => state.fakturaStore.state.endDate)

    const onDialogClose = () => {
        dispatch(setDeleteMode(''))

        if (deleteMode === 'single') {
            dispatch(setSelectedRow([]))
        }
    }

    const onDelete = async () => {
        dispatch(setDeleteMode(''))

        if (deleteMode === 'single') {
            const success = await getFaktura({
                user_ids: selectedRow,
                from_date: dayjs(startDate).format('YYYY-MM-DD'),
                to_date: dayjs(endDate).format('YYYY-MM-DD'),
            })
            deleteSucceed(success)
            dispatch(setSelectedRow([]))
        }

        if (deleteMode === 'batch') {
            const success = await getFaktura({
                user_ids: selectedRows,
                from_date: dayjs(startDate).format('YYYY-MM-DD'),
                to_date: dayjs(endDate).format('YYYY-MM-DD'),
            })

            deleteSucceed(success, selectedRows.length)
            dispatch(setSelectedRows([]))
        }
    }

    const deleteSucceed = (success, orders) => {
        if (success) {
            generateExcel(success)

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

    // onClick={generateExcel}
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
            confirmText="Получить фактуру"
        >
            {/* <p>
                Are you sure you want to delete this order? All record related
                to this order will be deleted as well. This action cannot be
                undone.
            </p> */}
        </ConfirmDialog>
    )
}

export default FakturaGetConfirmation
