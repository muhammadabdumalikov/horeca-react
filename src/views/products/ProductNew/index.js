import React from 'react'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import ProductForm from '../ProductForm'
import { apiCreateSalesProduct } from 'services/SalesService'

const ProductNew = () => {
    const navigate = useNavigate()

    const CreateProduct = async (data) => {
        const response = await apiCreateSalesProduct(data)
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
                        title={'Продукт успешно добавлен'}
                        type="success"
                        duration={2500}
                    >
                        Продукт успешно добавлен
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
                navigate('/products')
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
        navigate('/products')
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
