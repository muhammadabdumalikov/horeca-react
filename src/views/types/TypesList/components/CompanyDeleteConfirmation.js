import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDeleteConfirmation } from '../store/stateSlice'
import { deleteCompany, getCompanies } from '../store/dataSlice'

const ProductDeleteConfirmation = () => {
    const dispatch = useDispatch()
    const dialogOpen = useSelector(
        (state) => state.salesCompanyList.state.deleteConfirmation
    )
    const selectedCompany = useSelector(
        (state) => state.salesCompanyList.state.selectedCompany
    )
    const tableData = useSelector(
        (state) => state.salesCompanyList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteCompany({ id: selectedCompany })

        if (success) {
            dispatch(getCompanies(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Product successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="danger"
            title="Удалить товар"
            onCancel={onDialogClose}
            onConfirm={onDelete}
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
