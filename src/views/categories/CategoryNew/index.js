import React from 'react'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { apiCreateCategory } from 'services/SalesService'
import ProductForm from '../CategoryForm'

const ProductNew = () => {
    const navigate = useNavigate()

    const addCategory = async (data) => {
        const response = await apiCreateCategory(data)
        return response.data
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await addCategory(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Успешно'}
                    type="success"
                    duration={2500}
                >
                    Категория успешно добавлен
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/categories')
        }
    }

    const handleDiscard = () => {
        navigate('/categories')
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
