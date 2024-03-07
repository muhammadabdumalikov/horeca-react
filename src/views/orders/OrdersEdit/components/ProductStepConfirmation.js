import React, { useState } from 'react'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { toggleEditOrderStep } from '../store/stateSlice'
import OrdersStep from './ordersStep'
import { updateOrderStatus } from 'views/orders/OrdersList/store/dataSlice'
import { Notification, toast } from 'components/ui'

const ProductStepConfirmation = () => {
    const dispatch = useDispatch()

    const data = useSelector((state) => state.xordersStore.data.productList)

    const [step, setStep] = useState(data?.status)

    const dialogOpen = useSelector(
        (state) => state.xordersStore.state.editOrderStep
    )

    const onDialogClose = () => {
        dispatch(toggleEditOrderStep(false))
    }

    const onDelete = async () => {
        dispatch(toggleEditOrderStep(false))
        const success = await dispatch(
            updateOrderStatus({ order_id: data?.id, status: `${step}` })
        )

        if (success) {
            toast.push(
                <Notification
                    title={'Успешно изменено'}
                    type="success"
                    duration={2500}
                >
                    Cтатус успешно изменено
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
            title="Изменить процесс заказа"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmButtonColor="blue-600"
            confirmText="Cохранить"
        >
            <div className="my-10 block">
                <OrdersStep step={step} setStep={setStep} />
            </div>
        </ConfirmDialog>
    )
}

export default ProductStepConfirmation
