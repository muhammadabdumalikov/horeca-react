import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDeleteConfirmation } from '../store/stateSlice'
import { apiOrderUpdate } from 'services/SalesService'
import { useParams } from 'react-router-dom'
import { getProductsByOrderId } from '../store/dataSlice'

const ProductDeleteConfirmation = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    const dialogOpen = useSelector(
        (state) => state.xordersStore.state.deleteConfirmation
    )

    const selectedProduct = useSelector(
        (state) => state.xordersStore.state.selectedProduct
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))

        console.log('ok')

        const success = await apiOrderUpdate({
            items: [
                {
                    id: id,
                    order_item_id: selectedProduct.order_item_id,
                    order_item_quantity: 0,
                },
            ],
        })

        console.log(success, 'success')

        if (success) {
            dispatch(getProductsByOrderId({ id: id }))

            toast.push(
                <Notification
                    title={'Успешно удален'}
                    type="success"
                    duration={2500}
                >
                    Продукт успешно удалено
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
                Вы уверены, что хотите удалить этот товар? Все, что связано с
                записью к этому продукту также будут удалены. Это действие не
                может быть отменено.
            </p>
        </ConfirmDialog>
    )
}

export default ProductDeleteConfirmation
