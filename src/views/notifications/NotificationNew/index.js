import React from 'react'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import ProductForm from '../NotificationForm'
import { apiCreateNotification } from 'services/SalesService'

const ProductNew = () => {
    const navigate = useNavigate()

    const CreateProduct = async (data) => {
        const response = await apiCreateNotification(data)
        return response.data
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        try {
            setSubmitting(true)

            const success = await CreateProduct(values)
            setSubmitting(false)

            if (success) {
                toast.push(
                    <Notification
                        title={'Уведомления успешно добавлено'}
                        type="success"
                        duration={2500}
                    >
                        Уведомления успешно добавлно
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
                navigate('/notifications')
            }
        } catch (e) {
            toast.push(
                <Notification title={'Ошибка'} type="danger" duration={2500}>
                    {e.response.data.message}
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    const handleDiscard = () => {
        navigate('/notifications')
    }

    return (
        <>
            <ProductForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default ProductNew
