import React, { useState } from 'react'
import { Input, Notification, toast } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { toggleEditConfirmation } from '../store/stateSlice'
import { apiOrderUpdate } from 'services/SalesService'
import { useParams } from 'react-router-dom'
import { getProductsByOrderId } from '../store/dataSlice'

const ProductEditConfirmation = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    const dialogOpen = useSelector(
        (state) => state.xordersStore.state.editConfirmation
    )
    const selectedProduct = useSelector(
        (state) => state.xordersStore.state.selectedProduct
    )

    const onDialogClose = () => {
        dispatch(toggleEditConfirmation(false))
    }

    const [value, setValue] = useState(selectedProduct?.quantity)

    const onChangeInput = (e) => {
        setValue(e.target.value)
    }

    const onDelete = async () => {
        dispatch(toggleEditConfirmation(false))

        const success = await apiOrderUpdate({
            items: [
                {
                    id: id,
                    order_item_id: selectedProduct.order_item_id,
                    order_item_quantity: Math.floor(value),
                },
            ],
        })

        if (success) {
            dispatch(getProductsByOrderId({ id: id }))

            toast.push(
                <Notification
                    title={'Успешно изменено'}
                    type="success"
                    duration={2500}
                >
                    Количество успешно изменено
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
            type="info"
            title="Изменить количество товара"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmButtonColor="blue-600"
            confirmText="Cохранить"
        >
            <p className="mb-4">{selectedProduct?.name_ru}</p>{' '}
            <Input
                defaultValue={selectedProduct?.quantity}
                type="text"
                autoComplete="off"
                placeholder="Количество"
                onChange={onChangeInput}
            />
        </ConfirmDialog>
    )
}

export default ProductEditConfirmation
