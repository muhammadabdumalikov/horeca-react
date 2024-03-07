import React, { useState } from 'react'
import { Input, Notification, toast } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { toggleEditPayment } from '../store/stateSlice'
import { useParams } from 'react-router-dom'
import { getProductsByOrderId } from '../store/dataSlice'
import { apiOrderUpdatePayment } from 'services/SalesService'

const ProductEditPaymentConfirmation = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    const dialogOpen = useSelector(
        (state) => state.xordersStore.state.editPayment
    )
    const selectedProduct = useSelector(
        (state) => state.xordersStore.state.selectedProduct
    )

    const onDialogClose = () => {
        dispatch(toggleEditPayment(false))
    }

    const [value, setValue] = useState(selectedProduct?.quantity)

    const onChangeInput = (e) => {
        setValue(e.target.value)
    }

    const onDelete = async () => {
        dispatch(toggleEditPayment(false))

        const success = await apiOrderUpdatePayment({
            order_id: id,
            paid_price: Math.floor(value),
        })

        if (success) {
            dispatch(getProductsByOrderId({ id: id }))

            toast.push(
                <Notification
                    title={'Успешно изменено'}
                    type="success"
                    duration={2500}
                >
                    Cумма успешно изменено
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    console.log(selectedProduct, 'selectedProduct')

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="info"
            title="Изменить cумма товара"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmButtonColor="blue-600"
            confirmText="Cохранить"
        >
            {/* <p className="mb-4">{selectedProduct?.name_ru}</p>{' '} */}
            <Input
                // defaultValue={selectedProduct?.quantity}
                type="text"
                autoComplete="off"
                placeholder="Количество"
                onChange={onChangeInput}
            />
        </ConfirmDialog>
    )
}

export default ProductEditPaymentConfirmation
